import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import instituteImage from "../assets/institution-detail.png";
import studentPerStaf from "../assets/studentPerStaf.png";
import satisfactionRate from "../assets/satisfactionRate.png";
import fullTimeStudents from "../assets/fullTimeStudents.png";
import rating from "../assets/trophy.png";
import internationalStudent from "../assets/country_new.png";
import award from "../assets/award.svg";
import { FaAward } from "react-icons/fa";
import scholar1 from "../assets/scholarship1.png";
import scholar2 from "../assets/scholarship2.png";
import CustomLoader from "../components/loader";
import toast from "react-hot-toast";
import { getCourses } from "../Services/dashboard";
import course_icon from "../assets/course.png";
import time from "../assets/ion_time-outline.png";
import walletImage from "../assets/solar_wallet-linear.png";
import ellipse from "../assets/Ellipse.png";
import cherons from "../assets/chevrons-right.png";
import DOMPurify from 'dompurify';
const InstitutionDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Undergraduate");
  const backgroundImageUrl =
    location.state?.universityDetails?.bannerImage || instituteImage;
  const backgroundStyle = {
    width: "100%",
    height: "70vh",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    color: "white",
    marginBottom: "12px",
  };

  const user = JSON.parse(localStorage.getItem("_u"));
  const loggedIn = !!user?.token;

  const createMarkup = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  }
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await getCourses();
      setCourses(
        response.data.data?.filter(
          (course) =>
            course.universityName?.toLowerCase() ===
            location.state?.universityDetails?.universityName?.toLowerCase()
        ) || []
      );
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setCurrentPage(1);
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  const filterCourses = (courses, activeTab) => {
    return courses.filter(course => {
      const level = course.level.trim();
      if (activeTab === "Undergraduate") {
        return level === "UG" || level === "UG Diploma";
      } else if (activeTab === "post_graduate") {
        return level === "PG" || level === "PG Diploma";
      }
      return false;
    });
  };

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const filteredCourses = filterCourses(courses, activeTab);
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  return (
    <div>
      {loading && <CustomLoader />}
      <div className="container-fluid">
        <div style={{ marginBottom: "12px", paddingTop: "70px" }}>
          <nav aria-label="breadcrumb" >
            <ol className="breadcrumb" style={{ fontFamily: "Lato", fontWeight: 500 }}>
              <li className="breadcrumb-item">
                <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/institutions" style={{ textDecoration: "none", color: "#000" }}>
                  Institutions
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {location.state?.universityDetails?.universityName}
              </li>
            </ol>
          </nav>
        </div>
        <div className="insti_container" style={backgroundStyle}>
          <div
            className="container"
            style={{ maxWidth: "82vw", marginTop: "400px" }}
          >
            <div className=" image-download-nutton-cut row mb-4 align-items-center justify-content-between">
              <div className="col d-flex align-items-center">
                <div className="university-logo-circle mr-3">
                  <img
                    src={location.state?.universityDetails?.universityLogo}
                    alt="University Logo"
                    style={{ width: "60px", height: "60px", borderRadius: "50%" }}
                  />
                </div>
                <div>
                  <h2 style={{ fontFamily: "Lato", fontWeight: 700 }}>
                    {location.state?.universityDetails?.universityName}
                  </h2>
                  <h3 style={{ fontFamily: "Lato", fontWeight: 500 }}>
                    {location.state?.universityDetails?.city},{" "}
                    {location.state?.universityDetails?.country}
                  </h3>
                </div>
              </div>
              <div className="col-auto">
                <button
                  style={{ fontFamily: "Lato", fontWeight: 500 }}
                  onClick={() => {
                    if (!loggedIn) {
                      navigate("/");
                      return;
                    };
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                    }, 1000)
                    if (location.state?.universityDetails?.brochure)
                      window.open(
                        location.state?.universityDetails?.brochure,
                        "_blank"
                      );
                  }}
                  className="explore-button mt-3 fw-bold"
                >
                  {'Download Brochure'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mr-0 ml-0">
        <div className="col-md-9">
          <div className="container uni-details py-5">
            <h2 className="mt-3" style={{ fontFamily: "Lato", fontWeight: 500 }}>
              Overview
            </h2>
            <div
              style={{ fontFamily: "Lato", fontWeight: 500 }}
              dangerouslySetInnerHTML={createMarkup(location.state?.universityDetails?.overview)}
            />

            <h2 className="mt-3" style={{ fontFamily: "Lato", fontWeight: 500 }}>
              Admission Requirements
            </h2>
            <div
              style={{ fontFamily: "Lato", fontWeight: 500 }}
              dangerouslySetInnerHTML={createMarkup(location.state?.universityDetails?.admissionReq)}
            />
            <h2 className="mt-5" style={{ fontFamily: "Lato", fontWeight: 500 }}>
              University Stats
            </h2>
            <div className="d-flex gap-3 flex-wrap award_imgs">
              {[
                {
                  logo: studentPerStaf,
                  data:
                    location.state?.universityDetails?.universityStats
                      ?.studentsPerStaff || 0,
                  text: "Students to Faculty Ratio",
                },
                {
                  logo: fullTimeStudents,
                  data:
                    (location.state?.universityDetails?.universityStats
                      ?.fulltimeStudents || 0) + `+`,
                  text: "No. of Full-time Students",
                },
                {
                  logo: internationalStudent,
                  data:
                    (location.state?.universityDetails?.universityStats
                      ?.internationalStudentPercentage || 0),
                  text: "Percentage of International Students",
                },
                {
                  logo: satisfactionRate,
                  data:
                    (location.state?.universityDetails?.universityStats
                      ?.studentSatisfactionRate || 0) + `%`,
                  text: "Student Satisfaction Ratio",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="card text-center d-flex flex-column justify-content-center align-items-center p-3"
                  style={{
                    width: "220px",
                    height: "200px",
                    borderRadius: "16px",
                    backgroundColor: "#FFF",
                    boxShadow: "0 4px 8px rgba(255, 100, 119, 0.5)",
                  }}
                >
                  <img
                    src={item.logo}
                    alt="award"
                    style={{ width: "40px", height: "40px" }}
                    className="mb-3"
                  />
                  <div
                    className="number mb-2 font-lato-bold"
                    style={{
                      fontSize: "35px",
                      lineHeight: "48px",
                      fontStyle: "normal",
                      fontFamily: "Lato", fontWeight: 700,
                    }}
                  >
                    {item.data}
                  </div>
                  <div
                    className="title"
                    style={{
                      fontSize: "18px",
                      lineHeight: "22px",
                      fontStyle: "normal",
                      fontFamily: "Lato", fontWeight: 500,
                    }}
                  >
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
            <h2 className="mt-5 mb-4" style={{ fontFamily: "Lato", fontWeight: 500 }}>
              What's unique about the university?
            </h2>
            <div className="d-flex gap-3 flex-wrap award_imgs">
              <img
                className="shadow p-2"
                style={{
                  width: "220px",
                  height: "200px",
                  borderRadius: "16px",
                }}
                src={
                  location?.state?.universityDetails?.uniqueUniversityInfo
                    ?.image1 || award
                }
                alt=""
              />
              <img
                className="shadow p-2"
                style={{
                  width: "220px",
                  height: "200px",
                  borderRadius: "16px",
                }}
                src={
                  location?.state?.universityDetails?.uniqueUniversityInfo
                    ?.image2 || award
                }
                alt=""
              />
              <img
                className="shadow p-2"
                style={{
                  width: "220px",
                  height: "200px",
                  borderRadius: "16px",
                }}
                src={
                  location?.state?.universityDetails?.uniqueUniversityInfo
                    ?.image3 || award
                }
                alt=""
              />
              <img
                className="shadow p-2"
                style={{
                  width: "220px",
                  height: "200px",
                  borderRadius: "16px",
                }}
                src={
                  location?.state?.universityDetails?.uniqueUniversityInfo
                    ?.image4 || award
                }
                alt=""
              />
            </div>
          </div>
          <div style={{ padding: "25px" }}>
            <h1 className="font-lato fw-bold course-head mt-5">
              <img src={course_icon} className="img-fluid" alt="" />
              <span
                className="mt-1 ml-2 font-lato bold"
                style={{ fontFamily: "Lato", fontWeight: 700 }}
              >
                Courses
              </span>
            </h1>
            <div className="mt-3 gap-3 flex-wrap active-tab-res">
              <button
                className={`detail_button ${activeTab === "Undergraduate" ? "active-tab-course" : ""}`}
                style={{ fontFamily: "Lato", fontWeight: 500 }}
                onClick={() => handleTabClick("Undergraduate")}
              >
                Undergraduate
              </button>

              <button
                className={`detail_button ${activeTab === "post_graduate" ? "active-tab-course" : ""}`}
                style={{ fontFamily: "Lato", fontWeight: 500 }}
                onClick={() => handleTabClick("post_graduate")}
              >
                Post graduate
              </button>
              <div className="row">
                {currentCourses?.map((course, index) => {
                  return (
                    <div className="col-md-6 mb-3" key={index}>
                      <div className="course_card mt-0">
                        <h4 style={{ fontFamily: "Lato", fontWeight: 700 }}>{course?.courseName}</h4>
                        <h6 style={{ fontFamily: "Lato", fontWeight: 500 }}>
                          <img
                            style={{
                              height: "1rem",
                              width: "1rem",
                              objectFit: "cover",
                              marginRight: "5px",
                            }}
                            alt=""
                            src={ellipse}
                          />
                          {course?.universityName}
                        </h6>
                        <div className="gap-2" style={{ display: 'flex', alignItems: 'center' }}>
                          <div>
                            <p className="text-secondary" style={{ fontFamily: "Lato", fontWeight: 500 }}>
                              <img
                                style={{
                                  height: "1rem",
                                  width: "1rem",
                                  objectFit: "cover",
                                  marginRight: "5px",
                                }}
                                alt=""
                                src={walletImage}
                              />
                              Fees($)
                            </p>
                            <p className="hilight-danger" style={{ fontFamily: "Lato", fontWeight: 500 }}>
                              $ {course?.uniqueCourseInfo?.fee}
                            </p>
                          </div>
                          <div className="ml-5">
                            <p className="text-secondary" style={{ fontFamily: "Lato", fontWeight: 500 }}>
                              <img
                                style={{
                                  height: "1rem",
                                  width: "1rem",
                                  objectFit: "cover",
                                  marginRight: "5px",
                                }}
                                alt=""
                                src={time}
                              />
                              Duration
                            </p>
                            <p className="hilight-danger" style={{ fontFamily: "Lato", fontWeight: 500 }}>
                              {course?.uniqueCourseInfo?.applicationDeadline?.split('T')[0]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {!currentCourses.length && (
                  <div className="text-center">
                    <p>No courses available</p>
                  </div>
                )}{filteredCourses.length > coursesPerPage && currentPage * coursesPerPage < filteredCourses.length && (
                  <div className="text-center mt-3">
                    <button
                      className="explore-button py-2 fw-light"
                      onClick={() => setCurrentPage(prevPage => prevPage + 1)}
                    >
                      Load More
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mt-5">
          <div className="right_scholar">
            <div className="s_img_card">
              <img src={scholar2} alt="" />
              <p className="mt-2" style={{ fontFamily: "Lato", fontWeight: 500 }}>
                Confused about our Career path?
              </p>
              <button
                className="explore-button py-2 fw-light mt-2"
                style={{ fontFamily: "Lato", fontWeight: 500 }}
                onClick={() => navigate("/career-path")}
              >
                Explore Career path finder
              </button>
            </div>
            <div className="s_img_card2">
              <div className="d-flex align-items-center">
                <div className="university-logo-circle mr-3">
                  <img
                    src={location.state?.universityDetails?.universityLogo}
                    alt="University Logo"
                    style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                  />
                </div>
                <div>
                  <p style={{ fontFamily: "Lato", fontWeight: 700 }}>
                    {location.state?.universityDetails?.universityName}
                  </p>
                  <p style={{ fontFamily: "Lato", fontWeight: 500 }}>
                    {location.state?.universityDetails?.city},{" "}
                    {location.state?.universityDetails?.country}
                  </p>
                </div>
              </div>
            </div>
            <div className="s_img_card2">
              <div className="row">
                <div className="col">
                  <img
                    style={{ width: "30px", height: "30px" }}
                    src={rating}
                    alt=""
                  />{" "}
                  <span style={{ fontFamily: "Lato", fontWeight: 700 }}>University Ranking</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-2">
                  <img
                    style={{ width: "60px", height: "60px" }}
                    src={location?.state?.universityDetails?.ranking?.logo}
                    alt=""
                  />{" "}
                  <span style={{ fontFamily: "Lato", fontWeight: 500 }}></span>
                </div>
                <div className="col-md-7 mt-3">
                  <p style={{ fontFamily: "Lato", fontWeight: 500 }}>
                    {location?.state?.universityDetails?.ranking?.name}
                  </p>
                </div>
                <div className="col-md-3 mt-3">
                  <p style={{ fontFamily: "Lato", fontWeight: 500 }}>
                    {location?.state?.universityDetails?.ranking?.rank}
                  </p>
                </div>
              </div>
            </div>
            <div className="s_img_card text-center">
              <p className="mt-2" style={{ fontFamily: "Lato", fontWeight: 700 }}>
                Look at all the courses
              </p>
              <button
                className="explore-button py-2 fw-light mt-2"
                style={{ fontFamily: "Lato", fontWeight: 500 }}
                onClick={() => navigate("/courses")}
              >
                Explore All Courses
              </button>
              <p className="my-2" style={{ fontFamily: "Lato", fontWeight: 700 }}>
                OR
              </p>
              <a href="https://wa.me/message/SMDIYPHGQFQRC1" target="_blank"
                style={{
                  color: "#ff5573",
                  cursor: "pointer",
                  fontFamily: "Lato", fontWeight: 500,
                }}
              >
                Chat with us
              </a>
            </div>
            <div className="s_img_card text-center mb-3">
              <img src={scholar1} alt="" />
              <p className="mt-2" style={{ fontFamily: "Lato", fontWeight: 700 }}>
                Let’s look at the scholarships available for you
              </p>
              <button
                style={{ fontFamily: "Lato", fontWeight: 500 }}
                className="explore-button py-2 fw-light mt-2"
                onClick={() => navigate("/scholarship")}
              >
                Explore All Scholarship
              </button>
              <p className="my-2" style={{ fontFamily: "Lato", fontWeight: 700 }}>
                OR
              </p>
              <a href="https://wa.me/message/SMDIYPHGQFQRC1" target="_blank"
                style={{
                  color: "#ff5573",
                  cursor: "pointer",
                  fontFamily: "Lato", fontWeight: 500,
                }}
              >
                Chat with us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionDetail;
