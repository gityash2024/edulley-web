import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CalendarMonth } from "@mui/icons-material";
import { getBlogs } from "../Services/dashboard";
import CustomLoader from "../components/loader";
import { toast } from "react-hot-toast";
import defaultBlogImage from "../assets/blog.png";
import quoteIcon from "../assets/quote.png";
import blog from "../assets/blog-detail.png";

const CardWrapper = styled.div`
  font-family: "Lato", sans-serif;
font-weight: 500 !important;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 16px;
  background-color: #fff;

  @media (min-width: 768px) {
    max-width: 90%;
  }
`;

const BlogTitle = styled.h4`
  fontFamily: "Lato", fontWeight: 700, sans-serif;
  margin-bottom: 10px;
`;

const DateWrapper = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #8D98A4;
  margin-bottom: 15px;
`;

const BlogImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 20px;
`;

const BlogContent = styled.div`
  font-family: "Lato", sans-serif;
font-weight: 500 !important;
  line-height: 1.6;
`;

const QuoteWrapper = styled.div`
  background-color: #FFF0F0;
  padding: 15px 15px 15px 70px;
  border-radius: 10px;
  position: relative;
  margin: 20px 0;

  &::before {
    content: '';
    background-image: url(${quoteIcon});
    background-size: contain;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 15px;
    left: 20px;
  }
`;

const TagsWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tag = styled.span`
  background-color: #FFF0F0;
  color: #000000;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9em;
`;

const RelatedBlogs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const RelatedBlogCard = styled.div`
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const RelatedBlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const RelatedBlogContent = styled.div`
  padding: 15px;
`;

const RelatedBlogTitle = styled.p`
  margin-top: 10px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BlogCard = ({ blogDetails }) => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  
  const getBlogsData = async () => {
    setLoading(true);
    try {
      const response = await getBlogs();
      if (!response.data?.error) {
        setBlogs(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogsData();
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    const month = d.toLocaleString("default", { month: "short" });
    const day = d.getDate();
    const year = d.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const capitaliseFirstWord = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  const handleLinkClick = (e) => {
    const { target } = e;
    if (target.tagName === 'A') {
      e.preventDefault();
      const href = target.getAttribute('href');
      if (href) {
        window.open(href, '_blank');
      }
    }
  };

  return (
    <CardWrapper onClick={handleLinkClick}>
      {loading && <CustomLoader />}
      <BlogTitle>{capitaliseFirstWord(blogDetails?.heading || '')}</BlogTitle>
      <DateWrapper>
        <CalendarMonth color="#8D98A4" /> {formatDate(blogDetails?.createdAt)}
      </DateWrapper>
      <BlogImage src={blogDetails?.bannerImage || blog} alt="Blog banner" />
      <BlogContent dangerouslySetInnerHTML={createMarkup(blogDetails?.content || '')} />
      {blogDetails?.quote && (
        <QuoteWrapper dangerouslySetInnerHTML={createMarkup(blogDetails?.quote || '')} />
      )}
      <TagsWrapper>
        Tags: 
        {blogDetails?.tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </TagsWrapper>
      <RelatedBlogs>
        {blogs.slice(0, 2).map(blog => (
          <RelatedBlogCard key={blog._id}>
            <RelatedBlogImage src={blog.bannerImage || defaultBlogImage} alt="Blog" />
            <RelatedBlogContent>
              <DateWrapper>
                <CalendarMonth style={{ color: "#8D98A4" }} />
                {formatDate(blog?.createdAt)}
              </DateWrapper>
              <RelatedBlogTitle>{capitaliseFirstWord(blog?.heading)}</RelatedBlogTitle>
              <TagsWrapper>
                {blog.tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagsWrapper>
            </RelatedBlogContent>
          </RelatedBlogCard>
        ))}
      </RelatedBlogs>
    </CardWrapper>
  );
};

export default BlogCard;