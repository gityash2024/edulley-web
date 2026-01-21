import React from "react";
import IletsCard from "../../components/exams/IletsCard";
import scholar1 from "../../assets/scholarship1.png";
import cherons from "../../assets/chevrons-right.png";
import list from "../../assets/list.svg";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";

const ExamIelts = () => {
  const navigate=useNavigate();
  const user = JSON.parse(localStorage.getItem("_u"));
  const loggedIn = !!user?.token;
  return (
    <>
  <SEO
  title="Study Abroad: IELTS Prep & Tips for Success"
  description="Prepare for studying abroad with our IELTS tips and guidance. Explore options for studying abroad without IELTS and get the information you need for success."
  canonicalUrl="https://edulley.com/exam-ielts"
  keywords="IELTS preparation, study abroad without IELTS, IELTS tips, IELTS success"
  ogType="website"
  ogImage="https://edulley.com/images/ielts-og.jpg"
  schema={{
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "IELTS Preparation for Study Abroad",
    "description": "Tips and guidance for IELTS success and studying abroad",
    "provider": {
      "@type": "Organization",
      "name": "Edulley",
      "sameAs": "https://edulley.com"
    },
    "educationalCredentialAwarded": "IELTS Preparation",
    "teaches": "English language proficiency for international study"
  }}
/>
      <div className="container-fluid ielts_container">
        <div className="ielts_content container " style={{marginTop: '200px'}}>
          <h1 style={{fontFamily: "Lato", fontWeight: 700}}>IELTS EXAM</h1>
          <h2 style={{fontFamily: 'Lato', fontWeight: 500}}>Complete Overview</h2>
          <button 
  className="explore-button mt-5 bg-black pull-right" 
  onClick={() => {
    if (!loggedIn) {
      navigate("/");
      return;
    }
    window.open('https://assets.ctfassets.net/unrdeg6se4ke/yn9JLeZ7qId6aTbskyC5R/52f2a3d11ca6f954bd029d308c2c2509/IELTS_Preparation_Guide__1_.pdf', '_blank');
  }} 
  style={{fontFamily: 'Lato', fontWeight: 500}}
>
            {'Download IELTS Guide'}
          </button>
        </div>
      </div>
      <div className="container py-4 course_container">
        <h3 style={{fontFamily: 'Lato', fontWeight: 500}} className="mb-3">IELTS Exam 2024-25</h3> 
        <div className="d-flex  justify-content-between inner_course mt-0">
          <div className="row">
            <div className="col-md-9">
              <div>
                <IletsCard />
              </div>
            </div>
            <div className="col-md-3">
              <div className="right_scholar exam-bar">
                  <div className="d-flex align-items-center gap-3">
                    <img style={{width: '2rem', height: '2rem'}} src={list} alt="" />
                    <h4 className="text-pink  mb-0 " style={{fontFamily: 'Lato', fontWeight: 500}}>
                      Table of Contents
                    </h4>
                  </div>
                <div className="s_img_card py-3">
                  <ul>
                    <li className="text-pink" style={{fontFamily: 'Lato', fontWeight: 500}}>Overview</li>
                    <li style={{fontFamily: 'Lato', fontWeight: 500}}>Why IELTS</li>
                    <li style={{fontFamily: 'Lato', fontWeight: 500}}>IELTS Test Format</li>
                    <li style={{fontFamily: 'Lato', fontWeight: 500}}>IELTS Syllabus</li>
                    <li style={{fontFamily: 'Lato', fontWeight: 500}}>IELTS Preparation</li>
                    <li style={{fontFamily: 'Lato', fontWeight: 500}}>IELTS Eligibility</li>
                    <li style={{fontFamily: 'Lato', fontWeight: 500}}>IELTS Registration</li>
                    <li style={{fontFamily: 'Lato', fontWeight: 500}}>IELTS Exam Fee</li>
                    <li style={{fontFamily: 'Lato', fontWeight: 500}}>IELTS Exam dates 2024</li>
                    <li style={{fontFamily: 'Lato', fontWeight: 500}}>IELTS test centres</li>
                    <li style={{fontFamily: 'Lato', fontWeight: 500}}>IELTS E-Book</li>
                    <li style={{fontFamily: 'Lato', fontWeight: 500}}>Band Descriptors</li>
                    <li style={{fontFamily: 'Lato', fontWeight: 500}}>IELTS Speaking test</li>
                    <li style={{fontFamily: 'Lato', fontWeight: 500}}>IELTS Reading test</li>
                    <li style={{fontFamily: 'Lato', fontWeight: 500}}>General Reading test</li>
                    <li style={{fontFamily: 'Lato', fontWeight: 500}}>General Writing Task</li>
                    <li style={{fontFamily: 'Lato', fontWeight: 500}}>IELTS Essay</li>
                    <li style={{fontFamily: 'Lato', fontWeight: 500}}>IELTS Result</li>
                    <li style={{fontFamily: 'Lato', fontWeight: 500}}>GPA</li>
                  </ul>
                </div>
                <div className="s_img_card side-bar-img text-center">
                  <img src={scholar1} alt="" />
                  <p className="mt-2" style={{fontFamily: "Lato", fontWeight: 700}}>
                    Let’s look at the scholarships available for you
                  </p>
                  <button onClick={() => navigate('/scholarship')} style={{fontFamily: 'Lato', fontWeight: 500}}  className="explore-button py-2 fw-light mt-2">
                    Explore All Scholarship
                  </button>
                  <p className="my-2" style={{fontFamily: "Lato", fontWeight: 700}}>OR</p>
                  <a href="https://wa.me/message/SMDIYPHGQFQRC1" target="_blank"
                    
                    style={{ color: "#ff5573", cursor: "pointer",fontFamily: 'Lato', fontWeight: 500 }}
                  >
                    Chat with us 
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamIelts;
