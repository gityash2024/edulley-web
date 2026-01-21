import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import scholar1 from "../assets/scholarship1.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import blog_icon from '../assets/blog_icon.png';
import { Search } from "@mui/icons-material";
import { getBlogs } from '../Services/dashboard';
import toast from 'react-hot-toast';
import CustomLoader from '../components/loader';
import SEO from "../components/SEO";
const createUrlSlug = (heading) => {
  return heading
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
      .trim()                   // Remove whitespace from both ends
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};
const BlogDetail = () => {
  const location = useLocation();
  const { heading } = useParams();
  const [blogDetails, setBlogDetails] = useState(location.state);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!blogDetails && heading) {
        const fetchBlogDetails = async () => {
            setLoading(true);
            try {
                const response = await getBlogs();
                if (!response.data?.error) {
                    const foundBlog = response.data.data.find(blog => 
                        createUrlSlug(blog.heading) === heading
                    );
                    
                    if (foundBlog) {
                        setBlogDetails(foundBlog);
                    } else {
                        navigate('/blog');
                    }
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error('Failed to fetch blog details');
                navigate('/blog');
            } finally {
                setLoading(false);
            }
        };
        fetchBlogDetails();
    }
}, [heading, blogDetails, navigate]);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <div className="container py-4 course_container">
  <SEO 
  title="Blog Details: Insights & Updates | Edulley"
  description="Explore detailed blog posts on Edulley for the latest insights and updates. Stay informed on study abroad trends, tips, and essential information for your journey."
  canonicalUrl={`https://edulley.com/blog/${heading}`}
  keywords="study abroad insights, international education blog, education abroad tips, student resources"
  ogType="article"
  ogImage="https://edulley.com/images/blog-detail-og.jpg"
  schema={{
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Blog Details: Insights & Updates | Edulley",
    "image": "https://edulley.com/images/blog-detail-og.jpg",
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Edulley"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Edulley",
      "logo": {
        "@type": "ImageObject",
        "url": "https://edulley.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://edulley.com/blog/${heading}`
    }
  }}
/>
      <div className="py-5"></div>
      <div className="row">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="font-lato fw-bold">
              <img src={blog_icon} className="img-fluid" alt="" />
              <span className="mt-1 ml-2" style={{ fontFamily: "Lato", fontWeight: 700 }}>Blogs</span>
            </h1>
          </div>
          <div className="search-filter" style={{ position: "relative" }}>
            <input
              type="text"
              className="form-control"
              placeholder=" Search Blogs"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                fontFamily: "Lato",
                fontWeight: 500,
                borderRadius: "20px",
                paddingLeft: "2rem"
              }}
            />
            <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}>
              <Search />
            </span>
          </div>
        </div>
        <p className="what-we-can-do-description mb-3" style={{ fontFamily: "Lato", fontWeight: 500 }}>
          Transforming the landscape of Education with revolutionary technology
        </p>
      </div>
      <div className="d-flex flex-wrap justify-content-between inner_course mt-0">
        <div className="col-12 col-md-9">
          <BlogCard blogDetails={blogDetails} />
        </div>
        <div className="col-12 col-md-3">
          <div className="right_scholar">
            <div className="s_img_card text-center">
            <p className="mt-2" style={{ fontFamily: "Lato", fontWeight: 700 }}>Look at all the courses</p>
              <button onClick={() => navigate("/courses")} className="explore-button mt-2">
                Explore All Courses
              </button>
              <p className="my-2" style={{ fontFamily: "Lato", fontWeight: 700 }}>OR</p>
              <a href="https://wa.me/message/SMDIYPHGQFQRC1" target="_blank" style={{ color: "#ff5573", cursor: "pointer", fontFamily: "Lato", fontWeight: 500 }}>
                Chat with us 
              </a>
            </div>
            <div className="s_img_card text-center">
              <img src={scholar1} alt="" />
              <p className="mt-2" style={{ fontFamily: "Lato", fontWeight: 700 }}>
                Let's look at the scholarships available for you
              </p>
              <button onClick={() => navigate("/scholarship")} className="explore-button mt-2">
                Explore All Scholarship
              </button>
              <p className="my-2" style={{ fontFamily: "Lato", fontWeight: 700 }}>OR</p>
              <a href="https://wa.me/message/SMDIYPHGQFQRC1" target="_blank" style={{ color: "#ff5573", cursor: "pointer", fontFamily: "Lato", fontWeight: 500 }}>
                Chat with us 
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;