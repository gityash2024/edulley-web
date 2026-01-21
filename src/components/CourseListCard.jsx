import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import CustomLoader from "../components/loader";
import { applyApplication, getUniversities, toggleShortlistAPI } from "../Services/dashboard";
import map from "../assets/mappin.svg";
import time from "../assets/ion_time-outline.png";
import walletImage from "../assets/solar_wallet-linear.png";
import ellipse from "../assets/Ellipse.png";
import Switch from "@mui/material/Switch";
import { useLocation, useNavigate } from "react-router-dom";

const CourseListCard = ({ course, onToggleSelection, isSelected, onCourseAdded }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("_u"));
    const loggedIn = !!user?.token;
    setIsLoggedIn(loggedIn);
  }, [location]);
  
  const [loading, setLoading] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [isShortlisted, setIsShortlisted] = useState(course.isShortlisted);

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

  useEffect(() => {
    fetchUniversities();
  }, []);

  const handleApplyApplication = async () => {
    const applicationDeadline = new Date(course?.uniqueCourseInfo?.applicationDeadline);
    const currentDate = new Date();
  
    if (applicationDeadline && applicationDeadline < currentDate) {
      toast.error('Application Closed');
      return;
    }
    const payload = { courseId: course?._id };
    setLoading(true);
  
    try {
      const response = await applyApplication(payload);
      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success('Successfully Added to your Profile');
        onCourseAdded(response.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Application process failed.');
      console.error('Failed to process application:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="course_card card mb-2">
      {loading && <CustomLoader />}
      <div className="inner_card_2">
        <div className="row">
          <div className="col-md-8">
            <h5 style={{ fontFamily: "Lato", fontWeight: 700, marginBottom: "0.5rem" }}>
              {course?.courseName || "--"}
            </h5>
          </div>
          <div className="col-md-4 d-flex align-items-center justify-content-end">
            <span style={{ fontFamily: 'Lato', fontWeight: 500, marginBottom: "0.5rem" }}>Compare</span>
            <Switch
              checked={isSelected}
              onChange={() => onToggleSelection(course._id)}
              color="primary"
              sx={{ "& .MuiSwitch-thumb": { backgroundColor: "#00949B" } }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8" style={{ marginBottom: "0.5rem" }}>
            <p style={{ marginBottom: "0.25rem" }}>
              <img
                style={{ height: "1rem", width: "1rem", objectFit: "cover", marginRight: "5px" }}
                alt=""
                src={ellipse}
              />
              {course?.universityName || "--"}
            </p>
            <p style={{ marginBottom: "0.25rem" }}>
              <img
                style={{ height: "1rem", width: "1rem", objectFit: "cover", marginRight: "5px" }}
                alt=""
                src={map}
              />
              {universities?.find((uni) => uni?.universityName?.trim()?.toLowerCase() === course?.universityName?.trim()?.toLowerCase())?.country || "--"},{universities?.find((uni) => uni?.universityName?.trim()?.toLowerCase() === course?.universityName?.trim()?.toLowerCase())?.city || '--'}
            </p>
          </div>
        </div>
      </div>
  
      <div className="row align-items-center" style={{ marginBottom: "0.5rem" }}>
        <div className="col-md-3">
          <span className="course_head_new">
            Level : {course?.level?.slice(0, 50) || "--"}
          </span>
        </div>
        <div className="col-md-3">
          <span className="course_head_new">
            Rank : {universities?.find((uni) => uni?.universityName?.trim()?.toLowerCase() === course?.universityName?.trim()?.toLowerCase())?.ranking?.rank || "--"}
          </span>
        </div>
      </div>
  
      <div className="row align-items-center" style={{ marginBottom: "0.5rem" }}>
        <div className="col-md-4">
          <p style={{ color: "#575656", fontFamily: "Lato", fontWeight: 500, marginBottom: "0.25rem" }}>
            <img
              style={{ height: "1rem", width: "1rem", objectFit: "cover", marginRight: "5px" }}
              alt=""
              src={walletImage}
            />
            Fees
          </p>
          <p style={{ color: "#FF5573", fontFamily: "Lato", fontWeight: 500, marginBottom: "0.25rem" }}>
            $ {course?.uniqueCourseInfo?.fee || "--"} / year
          </p>
        </div>
        <div className="col-md-4">
          <p style={{ color: "#575656", fontFamily: "Lato", fontWeight: 500, marginBottom: "0.25rem" }}>
            <img
              style={{ height: "1rem", width: "1rem", objectFit: "cover", marginRight: "5px" }}
              alt=""
              src={time}
            />
            Duration
          </p>
          <p style={{ color: "#FF5573", fontFamily: "Lato", fontWeight: 500, marginBottom: "0.25rem" }}>
            {course?.uniqueCourseInfo?.duration || "--"} years
          </p>
        </div>
        <div className="col-md-4">
          <p style={{ color: "#575656", fontFamily: "Lato", fontWeight: 500, marginBottom: "0.25rem" }}>
            <img
              style={{ height: "1rem", width: "1rem", objectFit: "cover", marginRight: "5px" }}
              alt=""
              src={time}
            />
            Application Fee
          </p>
          <p style={{ color: "#FF5573", fontFamily: "Lato", fontWeight: 500, marginBottom: "0.25rem" }}>
            $ {course?.uniqueCourseInfo?.applicationFee || "--"}
          </p>
        </div>
      </div>
      <div className="row align-items-center" style={{ marginBottom: "0.5rem" }}>
  <div className="col-md-6">
    <p style={{ color: "#575656", fontFamily: "Lato", fontWeight: 500, marginBottom: "0.25rem" }}>
      <img
        style={{ height: "1rem", width: "1rem", objectFit: "cover", marginRight: "5px" }}
        alt=""
        src={time}
      />
      Intake
    </p>
    <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' }}>
      {course?.uniqueCourseInfo?.upcomingIntakes.map((intake, index) => (
        <span key={index} style={{
          backgroundColor: index === 0 ? "#CCE6E8" : "#DDDDDD",
          color: index === 0 ? "#00949B" : "#575656",
          padding: "5px 10px",
          borderRadius: "5px",
          marginRight: "10px",
          whiteSpace: 'nowrap',
          minWidth: '80px',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          display: 'inline-block'
        }}>
          {intake || "--"}
        </span>
      ))}
    </div>
  </div>
  <div className="col-md-6 d-flex mobile-res-course-card   justify-content-end align-items-center">
      <button
        onClick={handleApplyApplication}
        style={{
          fontFamily: "Lato", fontWeight: 500,
          color: "#FF5573",
          padding: "7px",
          borderRadius: "8px",
          border: "1px solid #FF5573",
          background: "#fff",
          marginRight: "10px"
        }}
      >
        Apply
      </button>
   
    <button
      style={{
        fontFamily: "Lato", fontWeight: 500,
        color: "#FF5573",
        padding: "7px",
        borderRadius: "8px",
        border: "1px solid #FF5573",
        background: "#fff",
      }}
      onClick={() => navigate(`/course-details/${course.courseName.toLowerCase().replace(/\s+/g, '-')}`, { state: course })}>
      {"View Details >>"}
    </button>
  </div>
</div>
    </div>
  );
};

export default CourseListCard;