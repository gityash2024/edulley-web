import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarMonth, Search } from '@mui/icons-material';
import blog_icon from '../assets/blog_icon.png';
import defaultBlogImage from "../assets/blog.png";
import CustomLoader from '../components/loader';
import toast from 'react-hot-toast';
import { getBlogs } from '../Services/dashboard';
import scholar1 from '../assets/scholarship1.png';
import cherons from "../assets/chevrons-right.png";
import SEO from '../components/SEO';
const createUrlSlug = (heading) => {
    return heading
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
        .trim()                   // Remove whitespace from both ends
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};
const Blog = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage] = useState(9);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const checkForRedirects = () => {
            if (localStorage.getItem('visaGuidance') && blogs.length > 0) {
                const visaBlog = blogs.find(blog => 
                    blog.heading.toLowerCase().trim() === 'study visa guidance: your gateway to studying abroad'
                );
                if (visaBlog) {
                    navigate('/blog-details', { state: visaBlog });
                    localStorage.removeItem('visaGuidance');
                }
            }
            if (localStorage.getItem('accommodationGuidance') && blogs.length > 0) {
                const accommodationBlog = blogs.find(blog => 
                    blog.heading.toLowerCase().trim() === 'accommodation guidance: finding your perfect home away from home'
                );
                if (accommodationBlog) {
                    navigate('/blog-details', { state: accommodationBlog });
                    localStorage.removeItem('accommodationGuidance');
                }
            }
            if (localStorage.getItem('financialPlanning') && blogs.length > 0) {
                const financialBlog = blogs.find(blog => 
                    blog.heading.toLowerCase().trim() === 'financial planning for studies abroad: securing your future with confidence'
                );
                if (financialBlog) {
                    navigate('/blog-details', { state: financialBlog });
                    localStorage.removeItem('financialPlanning');
                }
            }
            if (localStorage.getItem('redirectToAboutUs') && blogs.length > 0) {
                const aboutUsBlog = blogs.find(blog => 
                    blog.heading.toLowerCase().trim() === 'about us'
                );
                if (aboutUsBlog) {
                    navigate('/blog-details', { state: aboutUsBlog });
                    localStorage.removeItem('redirectToAboutUs');
                }
            }
        };
        if (blogs.length > 0) {
            checkForRedirects();
        }
    }, [blogs, navigate]);

    const getBlogsData = async () => {
        setLoading(true);
        try {
            const response = await getBlogs();
            if (!response.data?.error) {
                setBlogs(response?.data?.data.reverse()||[]);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Failed to fetch blogs');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const month = d.toLocaleString("default", { month: "short" });
        const day = d.getDate();
        const year = d.getFullYear();
        return `${month} ${day}, ${year}`;
    };
    
    const capitaliseFirstWord = (str) => {
        return str
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
    }

    useEffect(() => {
        getBlogsData();
    }, []);

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = 0;

    const handleLoadMore = () => setCurrentPage(prevPage => prevPage + 1);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredBlogs = blogs.filter(blog => 
        blog.heading.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container py-4 course_container">
       <SEO
  title="Our Educational Blogs || Edulley Blogs"
  description="Stay updated with Edulley's educational blogs. Our expert articles provide valuable insights and resources to enrich your learning experience."
  canonicalUrl="https://edulley.com/blog"
  keywords="educational blogs, study abroad blogs, international education articles, student resources, learning insights"
  ogType="website"
  ogImage="https://edulley.com/images/blog-og.jpg"
  schema={{
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Edulley Educational Blog",
    "description": "Expert articles and insights on international education and studying abroad",
    "publisher": {
      "@type": "Organization",
      "name": "Edulley",
      "logo": {
        "@type": "ImageObject",
        "url": "https://edulley.com/logo.png"
      }
    }
  }}
/>
            <div className="py-5"></div>
            <div className="row justify-content-between inner_course mt-0">
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
                               <Search/>
                            </span>
                        </div>
                    </div>
                    <p className="what-we-can-do-description mb-3" style={{ fontFamily: "Lato", fontWeight: 500 }}>
                        Transforming the landscape of Education with revolutionary technology
                    </p>
                </div>
                {loading ? (
                    <CustomLoader />
                ) : (
                    <div className="col-md-9">
                        <div className="row g-4">
                            {filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog).map(blog => (
                                <div className="col-md-4" key={blog.heading}>
                                    <Link 
                                                to={`/blog/${createUrlSlug(blog.heading)}`}
                                                target="_blank"
                                                state={blog}
                                                style={{ textDecoration: 'none', color: 'inherit' }}
                                            >
                                        <div className="countries cursor-pointer uni_card blog-card h-100">
                                            <div style={{ height: '200px', overflow: 'hidden' }}>
                                                <img 
                                                    src={blog.bannerImage || defaultBlogImage}
                                                    alt="Blog"
                                                    className="university-image img-fluid w-100 h-100"
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                           {/* Replace the card content div in Blog.jsx */}
<div className="p-3 d-flex flex-column justify-content-between" style={{ height: 'calc(100% - 200px)' }}>
    <div>
        <p className="text-secondary mb-3 d-flex align-items-center gap-2" style={{ fontSize: '13px', fontFamily: "Lato", fontWeight: 500, color: "#8D98A4" }}>
            <CalendarMonth style={{ color: "#8D98A4" }} />
            {formatDate(blog?.createdAt)}
        </p>
        <div className="blog-tags mb-3">
            {blog.tags.map(tag => (
                <span className="badge me-2 p-2 mb-1" style={{ backgroundColor: "#FFF0F0", color: "#000000" }} key={tag}>{tag}</span>
            ))}
        </div>
    </div>
    <h3 className="mb-0" style={{ 
        fontFamily: "Lato",
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '1.4',
        display: '-webkit-box',
        WebkitLineClamp: '2',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
    }}>
        {capitaliseFirstWord(blog?.heading)}
    </h3>
</div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        {indexOfLastBlog < filteredBlogs.length && (
                            <div className="d-flex justify-content-center mt-4">
                                <button className="explore-button py-2 px-4" onClick={handleLoadMore} style={{ fontFamily: "Lato", fontWeight: 500 }}>
                                    Load More <img src={cherons} alt="Home" />
                                </button>
                            </div>
                        )}
                    </div>
                )}
                <div className="col-md-3">
                    <div className="s_img_card text-center">
                        <p style={{ fontFamily: "Lato", fontWeight: 700 }}>Look at all the courses</p>
                        <button onClick={()=>{navigate("/courses")}} style={{ fontFamily: "Lato", fontWeight: 500 }} className="explore-button py-2 fw-light mt-2">Explore All Courses</button>
                        <p className="my-2" style={{ fontFamily: "Lato", fontWeight: 700 }}>OR</p>
                        <a href="https://wa.me/message/SMDIYPHGQFQRC1" target="_blank" className="" style={{ color: "#ff5573", cursor: "pointer", fontFamily: "Lato", fontWeight: 500 }} >Chat with us </a>
                    </div>
                    <div className="s_img_card text-center mt-2">
                        <img src={scholar1} alt="" />
                        <p style={{ fontFamily: "Lato", fontWeight: 700 }}>Let's look at the scholarships available for you</p>
                        <button onClick={()=>{navigate("/scholarship")}} className="explore-button py-2 fw-light mt-2">Explore All Scholarship</button>
                        <p className="my-2" style={{ fontFamily: "Lato", fontWeight: 700 }}>OR</p>
                        <a href="https://wa.me/message/SMDIYPHGQFQRC1" target="_blank" className="" style={{ color: "#ff5573", cursor: "pointer", fontFamily: "Lato", fontWeight: 500 }} >Chat with us </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;