import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomLoader from "../../components/loader";
import toast from "react-hot-toast";
import { getUniversities, getCourses, getBlogs } from "../../Services/dashboard";
import ellipse from "../../assets/Ellipse.png";
import list from "../../assets/list.svg";
import defaultBlogImage from "../../assets/blog.png";
import time from "../../assets/ion_time-outline.png";
import walletImage from "../../assets/solar_wallet-linear.png";
import { CalendarMonth, HourglassEmpty } from "@mui/icons-material";

const CarrerPathDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState("Undergraduate");
  const [currentPage, setCurrentPage] = useState(1);
  const [popularCourses, setPopularCourses] = useState([]);
  const itemsPerPage = 6;

  useEffect(() => {
    if (!location.state || !location.state.qualification || !location.state.specialization) {
      toast.error("Please select qualification and specialization.");
      navigate('/carrer-path');
      return;
    }
    console.log(location.state);
    fetchData();
  }, [location.state]);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchUniversities(), fetchCourses(), getBlogsData()]);
    } catch (error) {
      toast.error("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUniversities = async () => {
    try {
      const res = await getUniversities();
      if (!res?.data?.error) {
        setUniversities(res.data.data);
      } else {
        toast.error("Failed to load universities data.");
      }
    } catch (error) {
      // toast.error("An error occurred while fetching universities.");
      console.log(error);

    }
  };

  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      if (!response?.data?.error) {
        const allCourses = response.data.data || [];
        setCourses(allCourses);
        filterCourses(allCourses);
      } else {
        toast.error("Failed to load courses data.");
      }
    } catch (error) {
      toast.error('Something went wrong while fetching courses.');
    }
  };

  const filterCourses = (allCourses) => {
    const { coursesName } = location.state;
    const filtered = allCourses.filter(course => 
      coursesName.some(name => course.courseName.trim().toLowerCase().includes(name.trim().toLowerCase()))
    );
    setFilteredCourses(filtered);
    
    // Set 4 random courses as popular courses
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    setPopularCourses(shuffled.slice(0, 4));
    
    // Automatically switch to Postgraduate if no Undergraduate courses
    const hasUndergraduateCourses = filtered.some(course => 
      course.level?.toLowerCase() === "ug" || course.level.toLowerCase() === "ug diploma"
    );
    if (!hasUndergraduateCourses) {
      setActiveTab("Postgraduate");
    }
  };

  const getBlogsData = async () => {
    try {
      const response = await getBlogs();
      if (!response.data?.error) {
        setBlogs(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to fetch blogs');
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
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setCurrentPage(1);
  };

  const filteredTabCourses = filteredCourses.filter(course => 
    (activeTab === "Undergraduate" && (course.level?.toLowerCase() === "ug" || course.level.toLowerCase() === "ug diploma")) ||
    (activeTab === "Postgraduate" && (course.level.toLowerCase() === "pg" || course.level.toLowerCase() === "pg diploma"))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = filteredTabCourses.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <div className="container py-5 course_container" style={{ backgroundColor: "#FFFBFB" }}>
      <div className="py-4"></div>
      <div className="row mb-4">
        <div className="col-md-9 d-flex align-items-center">
          <p style={{ fontFamily: 'Lato', fontWeight: 500 }}>Courses & University suitable paths for you</p>
        </div>
        <div className="col-md-3 d-flex justify-content-end align-items-center">
          <span style={{ fontFamily: 'Lato', fontWeight: 500, marginRight: '10px', width: "80px" }}>Sort by</span>
          <select className="form-select" style={{ fontFamily: 'Lato', fontWeight: 500 }}>
            <option value="Relevance">Relevance</option>
            <option value="Deadline">Deadline</option>
            <option value="FeeHighToLow">Fee Amount (High to Low)</option>
            <option value="FeeLowToHigh">Fee Amount (Low to High)</option>
            <option value="TopRated">Top Rated</option>
            <option value="Applications">No. of Applications</option>
          </select>
        </div>
      </div>
      <div>
        <div className="row">
          <div className="col-md-9">
            <div className="mb-4">
              <button
                className={`btn ${activeTab === "Undergraduate" ? "btn-danger" : "btn-outline-danger"} me-2`}
                onClick={() => handleTabClick("Undergraduate")}
                style={{ backgroundColor: activeTab === "Undergraduate" ? "#FF5573" : "white", borderColor: "#FF5573", color: activeTab === "Undergraduate" ? "white" : "#FF5573" }}
              >
                Undergraduate
              </button>
              <button
                className={`btn ${activeTab === "Postgraduate" ? "btn-danger" : "btn-outline-danger"}`}
                onClick={() => handleTabClick("Postgraduate")}
                style={{ backgroundColor: activeTab === "Postgraduate" ? "#FF5573" : "white", borderColor: "#FF5573", color: activeTab === "Postgraduate" ? "white" : "#FF5573" }}
              >
                Postgraduate
              </button>
            </div>
            {currentCourses.length > 0 ? (
              <div className="row">
                {currentCourses.map((course, index) => (
                  <div className="col-md-6 mb-4" key={index}>
                    <div className="course_card p-3" style={{ border: '1px solid #ddd', borderRadius: '8px' }}>
                      <h4 style={{ fontFamily: "Lato", fontWeight: 700 }}>{course?.courseName}</h4>
                      <div className="d-flex align-items-center gap-2">
                        <div>
                          <p className="text-secondary" style={{ fontFamily: "Lato", fontWeight: 500 }}>Fees</p>
                          <p className="hilight-danger" style={{ fontFamily: "Lato", fontWeight: 500 }}>$ {course?.uniqueCourseInfo?.fee}/Year</p>
                        </div>
                        <div className="ml-3">
                          <p className="text-secondary" style={{ fontFamily: "Lato", fontWeight: 500 }}>Duration</p>
                          <p className="hilight-danger" style={{ fontFamily: "Lato", fontWeight: 500 }}>{course?.uniqueCourseInfo?.duration} Years</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center my-5">
                <HourglassEmpty style={{ width: '150px', height: '150px' }} />
                <h3 className="mt-3" style={{ fontFamily: "Lato", fontWeight: 700 }}>No courses found</h3>
                <p style={{ fontFamily: "Lato", fontWeight: 500 }}>We couldn't find any courses matching your career path. Try exploring other options or contact us for assistance.</p>
              </div>
            )}
            {filteredTabCourses.length > itemsPerPage && (
              <div className="d-flex justify-content-center mt-4">
                {Array.from({ length: Math.ceil(filteredTabCourses.length / itemsPerPage) }, (_, i) => (
                  <button key={i} onClick={() => paginate(i + 1)} className={`btn ${currentPage === i + 1 ? 'btn-danger' : 'btn-outline-danger'} mx-1`} style={{ backgroundColor: currentPage === i + 1 ? "#FF5573" : "white", borderColor: "#FF5573", color: currentPage === i + 1 ? "white" : "#FF5573" }}>
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
            <div>
              {popularCourses.length > 0 && <h1 className="course-head mt-5">
                <span className="mt-1 ml-2" style={{ fontFamily: "Lato", fontWeight: 700, color: "#FF5573" }}>Popular Courses</span>
              </h1>}
              <div className="mt-3 gap-3 flex-wrap active-tab-res">
                <div className="row mt-3">
                  {popularCourses.map((course, index) => (
                    <div className="col-md-6 mb-4" key={index}>
                      <div className="course_card p-3" style={{ border: '1px solid #ddd', borderRadius: '8px' }}>
                        <h4 style={{ fontFamily: "Lato", fontWeight: 700 }}>{course?.courseName}</h4>
                        <h6 style={{ fontFamily: "Lato", fontWeight: 500 }}>
                          <img style={{ height: "1rem", width: "1rem", objectFit: "cover", marginRight: "5px" }} alt="" src={ellipse} />
                          {course?.universityName}
                        </h6>
                        <div className="gap-2 d-flex align-items-center">
                          <div>
                            <p className="text-secondary" style={{ fontFamily: "Lato", fontWeight: 500 }}>
                              <img style={{ height: "1rem", width: "1rem", objectFit: "cover", marginRight: "5px" }} alt="" src={walletImage} />
                              Fees($)
                            </p>
                            <p className="hilight-danger" style={{ fontFamily: "Lato", fontWeight: 500 }}>$ {course?.uniqueCourseInfo?.fee}</p>
                          </div>
                          <div className="ml-5">
                            <p className="text-secondary" style={{ fontFamily: "Lato", fontWeight: 500 }}>
                              <img style={{ height: "1rem", width: "1rem", objectFit: "cover", marginRight: "5px" }} alt="" src={time} />
                              Duration
                            </p>
                            <p className="hilight-danger" style={{ fontFamily: "Lato", fontWeight: 500 }}>{course?.uniqueCourseInfo?.applicationDeadline?.split('T')[0]}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="s_img_card text-center mb-4 p-3" style={{ border: '1px solid #ddd', borderRadius: '8px' }}>
              <p style={{ fontFamily: "Lato", fontWeight: 700 }}>Look at all the courses</p>
              <button style={{ fontFamily: "Lato", fontWeight: 500 }} className="explore-button py-2 fw-light mt-2" onClick={() => navigate('/courses')}>Explore All Courses</button>
              <p className="my-2" style={{ fontFamily: "Lato", fontWeight: 700 }}>OR</p>
              <a href="https://wa.me/message/SMDIYPHGQFQRC1" target="_blank" rel="noopener noreferrer" className="" style={{ color: "#ff5573", cursor: "pointer", fontFamily: "Lato", fontWeight: 500 }}>Chat with us </a>
            </div>
            <div className="s_img_card2 p-3" style={{ border: '1px solid #ddd', borderRadius: '8px' }}>
              <p className="mt-2" style={{ fontFamily: "Lato", fontWeight: 500, color: "#FF6477" }}>
                <img style={{ width: '2rem', height: '2rem', marginRight: "5px" }} src={list} alt="" />
                Related Blogs
              </p>
              <div>
                {blogs?.slice(0, 2)?.map((blog, index) => (
                  <div onClick={() => navigate(`/blog-details`, { state: blog })} className="countries cursor-pointer uni_card blog-card mb-3" key={index} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                    <img src={blog.bannerImage || defaultBlogImage} alt="Blog" className="university-image img-fluid" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <div className="p-3">
                      <p className="text-secondary d-flex align-items-center gap-2" style={{ fontSize: '16px', fontFamily: "Lato", fontWeight: 500, color: "#8D98A4" }}>
                        <CalendarMonth style={{ color: "#8D98A4" }} />
                        {formatDate(blog?.createdAt)}
                        <div className="blog-tags">
                          {blog.tags.map(tag => (
                            <span className="badge me-2 p-2" style={{ backgroundColor: "#FFF0F0", color: "#000000" }} key={tag}>{tag}</span>
                          ))}
                        </div>
                        </p>
                      <p className="mt-2 text-truncate" style={{ maxHeight: '3rem', overflow: 'hidden' }}>
                        {capitaliseFirstWord(blog?.heading)}
                      </p>
                      {blog.heading.length > 30 && (
                        <div className="tooltip">
                          <span className="tooltiptext" style={{ fontFamily: "Lato", fontWeight: 500 }}>{blog.heading}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarrerPathDetails;