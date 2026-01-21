import React, { useState, useEffect } from "react";
import instituteImage from "../assets/institution-detail.png";
import { useLocation, useNavigate,Link, useParams } from "react-router-dom";
import scholar1 from "../assets/scholarship1.png";
import time from "../assets/ion_time-outline.png";
import walletImage from "../assets/solar_wallet-linear.png";
import { toast } from "react-hot-toast";
import CustomLoader from "./loader";
import { applyApplication, getCourses } from "../Services/dashboard";
import cherons from "../assets/chevrons-right.png";
import SEO from "./SEO";
const CourseDetails = () =>{
  const { slug } = useParams();
  const location = useLocation();

  console.log(location.state, 'location.state');
  useEffect(() => {
    if (!location.state && slug) {
      // If no state is passed, fetch the course data using the slug
      const fetchCourseData = async () => {
        try {
          const response = await getCourses(); // Your existing API call
          const courseData = response.data.data.find(
            course => course.courseName?.toLowerCase().replace(/\s+/g, '-') === slug
          );
          if (courseData) {
            // Update the location state with the found course data
            navigate(`/course-details/${slug}`, { state: courseData, replace: true });
          }
        } catch (error) {
          console.error('Error fetching course:', error);
        }
      };
      fetchCourseData();
    }
  }, [slug, location.state]);

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };
    const [loading, setLoading] = useState(false);
  
 
  const backgroundImageUrl = location.state?.bannerImage || instituteImage;
  const backgroundStyle = {
    width: '100%',
    height: '70vh',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
  };
  const navigate=useNavigate()
  const handleCreateApplication = async () => {
    const applicationDeadline = new Date(location?.state?.uniqueCourseInfo?.applicationDeadline);
    const currentDate = new Date();
  
    if (applicationDeadline && applicationDeadline < currentDate) {
      toast.error('Application Closed');
      return;
    }
    const payload = { courseId: location.state?._id };
    setLoading(true);

    try {
      const response = await applyApplication(payload);
      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success("Successfully Added to your Profile");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Application process failed."
      );
      console.error("Failed to process application:", error);
    } finally {
      setLoading(false);
      navigate('/courses-list')

    }
  };

  return (
    <div>
   <SEO
  title="Study Abroad Course Details: Find Top Programs at Edulley"
  description="Explore detailed study abroad course options at Edulley. Find comprehensive information on programs to help you choose the best fit for your international education."
  canonicalUrl="https://edulley.com/course-details"
  keywords="study abroad programs, international courses, study abroad details, educational programs, international education"
  ogType="website"
  ogImage="https://edulley.com/images/course-details-og.jpg"
  schema={{
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Study Abroad Programs",
    "description": "Detailed information about study abroad programs and courses available through Edulley.",
    "provider": {
      "@type": "Organization",
      "name": "Edulley",
      "sameAs": "https://edulley.com"
    }
  }}
/>
      {loading && <CustomLoader />}
      
      <div style={{ marginBottom: "12px", paddingTop: "70px"}}>
          <nav aria-label="breadcrumb" >
            <ol className="breadcrumb" style={{ fontFamily: "Lato", fontWeight: 500 }}>
              <li className="breadcrumb-item">
                <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/courses" style={{ textDecoration: "none", color: "#000" }}>
                  Courses
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {location.state?.courseName}
              </li>
            </ol>
          </nav>
        </div>
      <div className="container-fluid insti_container" style={backgroundStyle}>
        <div className=" image-download-nutton-cut container" style={{ maxWidth: '82vw', marginTop: '400px' }}>
          <div className="row align-items-center justify-content-between">
            <div className="col d-flex align-items-center">
              <div className="university-logo-circle mr-3">
                <img src={location.state?.courseLogo} alt="University Logo" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
              </div>
              <div>
                <h2 style={{ fontFamily: "Lato", fontWeight: 700 }}>{location.state?.courseName}</h2>
                <h3 style={{ fontFamily: 'Lato', fontWeight: 500 }}>{location.state?.universityName}</h3>
              </div>
            </div>
            <div className="col-auto">
              <button style={{ fontFamily: 'Lato', fontWeight: 500 }} onClick={() => handleCreateApplication()} className="explore-button mt-3 fw-bold">
                Apply Application  <img src={cherons} alt="Home" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mr-0 ml-0">
        <div className="col-md-9">
        <div className="container py-4 mt-3" style={{ background: "#F7F7F7", borderRadius: "10px", marginBottom: "20px" }}>
  <h2 className="mt-3" style={{ fontFamily: "Lato", fontWeight: 500 }}>Overview</h2>
  <div 
    style={{ fontFamily: "Lato", fontWeight: 500 }}
     className="rendered-html-content"
    dangerouslySetInnerHTML={createMarkup(location.state?.overview)}
  />
</div>

<div className="container py-4" style={{ background: "#F7F7F7", borderRadius: "10px", marginBottom: "20px" }}>
  <h2 className="mt-3" style={{ fontFamily: "Lato", fontWeight: 500 }}>Requirements</h2>
  <div 
    style={{ fontFamily: "Lato", fontWeight: 500 }}
     className="rendered-html-content"
    dangerouslySetInnerHTML={createMarkup(location.state?.requirements)}
  />
</div>

<div className="container py-4 mb-3" style={{ background: "#F7F7F7", borderRadius: "10px" }}>
  <h2 className="mt-5" style={{ fontFamily: "Lato", fontWeight: 500 }}> Career prospect</h2>
  <div 
    style={{ fontFamily: "Lato", fontWeight: 500 }}
     className="rendered-html-content"
    dangerouslySetInnerHTML={createMarkup(location.state?.modules)}
  />
</div>
        </div>
        <div className="col-md-3 mt-5">
          <div className="right_scholar">
          <div className="s_img_card2 text-center mb-3" style={{ padding: "20px", borderRadius: "10px", backgroundColor: "#FFF" }}>
  <div className="d-flex justify-content-start align-items-center mb-3">
    <img style={{ height: "1rem", width: "1rem", objectFit: "cover", marginRight: "10px", filter: "invert(32%) sepia(61%) saturate(3713%) hue-rotate(329deg) brightness(102%) contrast(101%)" }} alt="" src={walletImage} />
    <p style={{ color: "#575656", fontFamily: "Lato", fontWeight: 500, margin: 0 }}>Fees</p>
    <p style={{ color: "#FF5573", fontFamily: "Lato", fontWeight: 500, marginLeft: "auto" }}>
      $ {location?.state?.uniqueCourseInfo?.fee || "--"} / year
    </p>
  </div>
  <div className="d-flex justify-content-start align-items-center mb-3">
    <img style={{ height: "1rem", width: "1rem", objectFit: "cover", marginRight: "10px", filter: "invert(32%) sepia(61%) saturate(3713%) hue-rotate(329deg) brightness(102%) contrast(101%)" }} alt="" src={time} />
    <p style={{ color: "#575656", fontFamily: "Lato", fontWeight: 500, margin: 0 }}>Duration</p>
    <p style={{ color: "#FF5573", fontFamily: "Lato", fontWeight: 500, marginLeft: "auto" }}>
      {location?.state?.uniqueCourseInfo?.duration || "--"} years
    </p>
  </div>
  <div className="d-flex justify-content-start align-items-center">
    <img style={{ height: "1rem", width: "1rem", objectFit: "cover", marginRight: "10px", filter: "invert(32%) sepia(61%) saturate(3713%) hue-rotate(329deg) brightness(102%) contrast(101%)" }} alt="" src={time} />
    <p style={{ color: "#575656", fontFamily: "Lato", fontWeight: 500, margin: 0 }}>Application Deadline</p>
    <p style={{ color: "#FF5573", fontFamily: "Lato", fontWeight: 500, marginLeft: "auto" }}>
      {location?.state?.uniqueCourseInfo?.applicationDeadline?.split('T')[0] || "--"}
    </p>
  </div>
</div>
<div className="s_img_card2 text-center mb-3" style={{ padding: "20px", borderRadius: "10px", backgroundColor: "#FFF" }}>
  <div className="d-flex justify-content-start align-items-center mb-3">
    <img style={{ height: "1rem", width: "1rem", objectFit: "cover", marginRight: "10px", filter: "invert(32%) sepia(61%) saturate(3713%) hue-rotate(329deg) brightness(102%) contrast(101%)" }} alt="" src={time} />
    <p style={{ color: "#575656", fontFamily: "Lato", fontWeight: 500, margin: 0 }}>Application Fees</p>
    <p style={{ color: "#FF5573", fontFamily: "Lato", fontWeight: 500, marginLeft: "auto" }}>
      $ {location?.state?.uniqueCourseInfo?.applicationFee || "--"}
    </p>
  </div>
  <div className="d-flex justify-content-start align-items-center mb-3">
    <img style={{ height: "1rem", width: "1rem", objectFit: "cover", marginRight: "10px", filter: "invert(32%) sepia(61%) saturate(3713%) hue-rotate(329deg) brightness(102%) contrast(101%)" }} alt="" src={walletImage} />
    <p style={{ color: "#575656", fontFamily: "Lato", fontWeight: 500, margin: 0 }}>Upcoming Intakes</p>
    <p style={{ color: "#FF5573", fontFamily: "Lato", fontWeight: 500, marginLeft: "auto" }}>
      {location?.state?.uniqueCourseInfo?.upcomingIntakes || "--"}
    </p>
  </div>
  <div className="d-flex justify-content-start align-items-center">
    <img style={{ height: "1rem", width: "1rem", objectFit: "cover", marginRight: "10px", filter: "invert(32%) sepia(61%) saturate(3713%) hue-rotate(329deg) brightness(102%) contrast(101%)" }} alt="" src={time} />
    <p style={{ color: "#575656", fontFamily: "Lato", fontWeight: 500, margin: 0 }}>Mode of Study</p>
    <p style={{ color: "#FF5573", fontFamily: "Lato", fontWeight: 500, marginLeft: "auto" }}>
      {location?.state?.uniqueCourseInfo?.studyMode || "--"}
    </p>
  </div>
</div>


            <div className="s_img_card text-center mb-3">
              <p className="mt-2" style={{ fontFamily: "Lato", fontWeight: 700 }}>
                Let’s look at the scholarships available for you
              </p>
              <img src={scholar1} alt="" />
              <p className="mt-2" style={{ fontFamily: "Lato", fontWeight: 700 }}>
                Let’s look at the scholarships available for you
              </p>
              <button onClick={() => navigate("/scholarship")} className="explore-button py-2 fw-light mt-2" style={{ fontFamily: "Lato", fontWeight: 500 }}>
                Explore All Scholarship
              </button>
            </div>
            <div className="s_img_card text-center mb-3">
              <p className="mt-2" style={{ fontFamily: "Lato", fontWeight: 700 }}>Look at all the courses</p>
              <button onClick={() => navigate("/courses")} className="explore-button py-2 fw-light mt-2" style={{ fontFamily: "Lato", fontWeight: 500 }}>
                Explore All Courses
              </button>
              <p className="my-2" style={{ fontFamily: "Lato", fontWeight: 700 }}>OR</p>
              <a href="https://wa.me/message/SMDIYPHGQFQRC1" target="_blank" className="" style={{ color: "#ff5573", cursor: "pointer", fontFamily: "Lato", fontWeight: 500 }}>
                Chat with us 
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default CourseDetails;
