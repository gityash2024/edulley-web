import React, { useEffect, useState } from "react";
import {toast} from "react-hot-toast";
import CustomLoader from "../components/loader";
import { applyApplication, getUniversities } from "../Services/dashboard";
import { Tooltip } from 'reactstrap';
import { Money, Timer, Wallet } from "@mui/icons-material";
import book from "../assets/book.svg";
import map from "../assets/mappin.svg";
import time from "../assets/ion_time-outline.png";
import walletImage from "../assets/solar_wallet-linear.png";
import ellipse from "../assets/Ellipse.png";
import { useNavigate } from "react-router-dom";

const CourseListCard = ({ course, universitiesProp, onCourseAdded }) => {
  const [loading, setLoading] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
const navigate=useNavigate();
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const [universities, setUniversities] = useState(universitiesProp||[]);
const handleCreateApplication = async () => {
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
        // Call the parent function to update the data
        onCourseAdded(response.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Application process failed.');
      console.error('Failed to process application:', error);
    } finally {
      setLoading(false);
    }
  };
  // const handleCreateApplication = async () => {
  //   const payload = { courseId: course?._id };
  //   setLoading(true);

  //   try {
  //     const response = await applyApplication(payload);
  //     if (response.error) {
  //       toast.error(response.message);
  //     } else {
  //       toast.success('Successfully Added to your Profile');
  //       setTimeout(() => {
          
  //         window.location.reload();
  //       },1000)
  //     }
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message || 'Application process failed.');
  //     console.error('Failed to process application:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="course_card card" style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden', marginBottom: "8px"}}>
      {loading && <CustomLoader />}
      <div className="inner_card">
        <div id={'Tooltip-' + course?._id}>
          <h5 style={{ fontFamily: "Lato", fontWeight: 700 }}>{course?.courseName || '--'}</h5>
          <p style={{fontFamily:"Lato", fontWeight: 500}}><img style={{ height: "1rem", width: "1rem", objectFit: "cover" , marginRight:'5px'}} alt="" src={ellipse} />{course?.universityName || '--'}</p>

          <p style={{ marginBottom: "0.25rem" }}>
          <img
            style={{ height: "1rem", width: "1rem", objectFit: "cover", marginRight: "5px" }}
            alt=""
            src={map}
          />
          {universities?.find((uni) => uni?.universityName?.trim()?.toLowerCase() === course?.universityName?.trim()?.toLowerCase())?.country || "--"},{universities?.find((uni) => uni?.universityName?.trim()?.toLowerCase() === course?.universityName?.trim()?.toLowerCase())?.city || '--'}
        </p>        </div>
        
        <div></div>
      </div>
      <div className="row" style={{ marginBottom: "0.5rem" }}>
        <div className="course_head_new">
          <h6 className="p-0 m-0">
            Level : {course?.level?.slice(0, 50) || "--"}
          </h6>
        </div>
        <div className="course_head_new ml-3">
          <h6 className="p-0 m-0">
            Rank : {universities?.find((uni) => uni?.universityName?.trim()?.toLowerCase() === course?.universityName?.trim()?.toLowerCase())?.ranking?.rank || "--"}
          </h6>
        </div>
      </div>
      <div className="d-flex align-items-center gap-5 mt-2 flex-wrap">
    <div>
        <p style={{color:"#575656",fontFamily:"Lato", fontWeight: 500}}><span></span> <img
            style={{ height: "1rem", width: "1rem", objectFit: "cover", marginRight: "5px" }}
            alt=""
            src={walletImage}
        />Fees</p>
        <p className="font-weight-bold" style={{color:"#FF5573", fontFamily: "Lato", fontWeight: 500}}>$ {course?.uniqueCourseInfo?.fee || '--'} / year</p>
    </div>
    <div>
        <p style={{color:"#575656",fontFamily:"Lato", fontWeight: 500}}><img
            style={{ height: "1rem", width: "1rem", objectFit: "cover", marginRight: "5px" }}
            alt=""
            src={time}
        />Duration</p>
        <p className="font-weight-bold" style={{color:"#FF5573", fontFamily: "Lato", fontWeight: 500}}>{course?.uniqueCourseInfo?.duration || '--'} years</p>
    </div>
    <div>
        <p style={{color:"#575656",fontFamily:"Lato", fontWeight: 500}}><img
            style={{ height: "1rem", width: "1rem", objectFit: "cover", marginRight: "5px" }}
            alt=""
            src={walletImage}
        />Application Fee</p>
        <p className="font-weight-bold" style={{color:"#FF5573", fontFamily: "Lato", fontWeight: 500}}>$ {course?.uniqueCourseInfo?.applicationFee || '--'}</p>
    </div>
    <div className="ml-auto"> {/* Use ml-auto to push the button to the right */}
      
    <button
            style={{
              fontFamily: "Lato", fontWeight: 500,
              color: "#FF5573",
              padding: "7px",
              borderRadius: "8px",
              border: "1px solid #FF5573",
              background: "#fff",
              marginRight: "20px"
            }}
            onClick={() => navigate('/course-details', { state: course })}
            >
            {"View Details >>"}
          </button>
        <button className="btn btn-primary text-white text-bold" style={{fontFamily: "Lato", fontWeight: 500}} onClick={handleCreateApplication}>Add Course &gt;&gt;</button>
    </div>
    <div className="ml-auto"> {/* Use ml-auto to push the button to the right */}
    </div>
</div>

    
    </div>
  );
};

export default CourseListCard;
