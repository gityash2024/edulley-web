import React, { useEffect, useState } from "react";
import userIcon from "../../../assets/users.svg";
import documentsIcon from "../../../assets/documents.svg";
import dollorIcon from "../../../assets/suitcase.png";
import testIcon from "../../../assets/test.png";
import PersonalDetails from "./personalDetails";
import AcademicProfile from "./AcademicProfile";
import WorkBackground from "./WorkBackground";
import TestScores from "./TestScores";
import { getStudentDetailsById } from "../../../Services/dashboard";
import { Book, ExpandMore } from "@mui/icons-material";
import { Paper } from "@mui/material";

const Profile = ({updateState}) => {
  const _u = JSON.parse(localStorage.getItem('_u'));
  const _id = _u ? _u._id : null;
  const [state, setState] = useState(1);
  const [studentDetails, setStudentDetails] = useState({});
  const [currentTab, setCurrentTab] = useState(0);
  useEffect(() => {
    if (_id) {
      getStudentDetailsById(_id).then((res) => {
        setStudentDetails(res.data.data);
      });
    }
  }, [_id]);

  const highlightColor = "#FF5573"; // Your chosen color

  return (
    <div className="container-fluid d-flex flex-column h-100 bg-white pt-4 rounded px-3 px-md-4">
      <div className="card mb-4 welcome-card" style={{ backgroundColor: '#FFF0F0', border: 'none' }}>
        <div className="card-header" style={{ fontFamily: "Lato", fontWeight: 700 }}>Welcome to Edulley!</div>
        <div className="card-body">
          <p className="card-text mb-3" style={{ color: highlightColor, fontFamily: "Lato", fontWeight: 500 }}>
            You are just a few steps away from submitting your application
          </p>
          <div className="d-flex flex-column flex-md-row justify-content-between">
            <span className="mb-2 mb-md-0" style={{ fontFamily: "Lato", fontWeight: 500 }}>
              Name : {studentDetails?.fullName || JSON.parse(localStorage.getItem('_u'))?.fullName || '--'}
            </span>
            <span className="mb-2 mb-md-0" style={{ fontFamily: "Lato", fontWeight: 500 }}>
              Email : {studentDetails?.email || JSON.parse(localStorage.getItem('_u'))?.email || '--'}
            </span>
            <span style={{ fontFamily: "Lato", fontWeight: 500 }}>
              Phone : {studentDetails?.contactNumber || JSON.parse(localStorage.getItem('_u'))?.mobileNumber || '--'}
            </span>
          </div>
        </div>
      </div>
      <div className="row mb-3 flex-grow-1">
        <div className="col-12 col-md-3 mb-4 mb-md-0">
          <div className="d-flex flex-row flex-md-column gap-3 border-bottom border-md-end border-dark pb-3 pb-md-0 overflow-auto">
            <div className="cursor-pointer d-flex gap-3 align-items-center" onClick={() => setState(1)}>
              <img className={`p-2 rounded ${state === 1 ? "bg-highlight" : "bg-light"}`} src={userIcon} alt="Personal Details" />
              <div>
                <h1 className={`small ${state === 1 ? "text-highlight" : "text-secondary"}`} style={{fontFamily:"Lato", fontWeight: 700}}>Personal Details</h1>
              </div>
            </div>
            <div className="cursor-pointer d-flex gap-3 align-items-center" onClick={() => setState(2)}>
              <img className={`p-2 rounded ${state === 2 ? "bg-highlight" : "bg-light"}`} src={documentsIcon} alt="Academic Profile" />
              <div>
                <h1 className={`small ${state === 2 ? "text-highlight" : "text-secondary"}`} style={{fontFamily:"Lato", fontWeight: 700}}>Academic Profile</h1>
              </div>
            </div>
            <div className="cursor-pointer d-flex gap-3 align-items-center" onClick={() => setState(3)}>
              <img className={`p-2 rounded ${state === 3 ? "bg-highlight" : "bg-light"}`} src={dollorIcon} alt="Work Backgrounds" />
              <div>
                <h1 className={`small ${state === 3 ? "text-highlight" : "text-secondary"}`} style={{fontFamily:"Lato", fontWeight: 700}}>Work Backgrounds</h1>
              </div>
            </div>
            <div className="cursor-pointer d-flex gap-3 align-items-center" onClick={() => setState(4)}>
              <img className={`p-2 rounded ${state === 4 ? "bg-highlight" : "bg-light"}`} src={testIcon} alt="Tests" />
              <div >
                <h1 className={`small ${state === 4 ? "text-highlight" : "text-secondary"}`} style={{fontFamily:"Lato", fontWeight: 700}}>Tests</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-9 right-bar-form-profile">
          {state === 1 && <PersonalDetails updateState={setState} />}
          {state === 2 && <AcademicProfile updateState={setState} />}
          {state === 3 && <WorkBackground updateState={setState} />}
          {state === 4 && <TestScores updateState={updateState}/>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
