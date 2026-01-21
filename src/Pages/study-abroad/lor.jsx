import React from "react";
import scholar1 from "../../assets/scholarship1.png";
import list from "../../assets/list.svg";
import LORCard from "./lorCard";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";

const LOR = () => {
  const navigate = useNavigate();
  return (
    <>
     <SEO 
  title="Write Professional LORs for Top Universities & Scholarships Abroad"
  description="Discover the best universities abroad for Indian students, explore scholarship programs, and learn how to study without IELTS at Edulley"
  canonicalUrl="https://edulley.com/lor"
  keywords="letter of recommendation, LOR writing, university application, scholarship application"
  ogType="website"
  ogImage="https://edulley.com/images/lor-og.jpg"
  schema={{
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Writing Professional Letters of Recommendation",
    "description": "Guide to writing effective letters of recommendation for university applications",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Understand Requirements",
        "text": "Research the specific requirements for the university or scholarship program"
      },
      {
        "@type": "HowToStep",
        "name": "Draft Effective Content",
        "text": "Create compelling content highlighting relevant qualifications and achievements"
      }
    ]
  }}
/>
      <div className="container-fluid lor_container">
        <div className="ielts_content container">
          <h1 style={{color:"#ffff", fontFamily:"Lato", fontWeight: 700}}>Letter of Recommendation</h1>
          <h2 style={{color:"#ffff", fontFamily:"Lato", fontWeight: 500}}>All you need to know!</h2>
        </div>
      </div>
      <div className="container py-4 course_container">
        <h3 style={{fontFamily:"Lato", fontWeight: 700}} className="mb-4">Your Ultimate Guide to LORs – Get That Perfect Letter!</h3>
        <div className="d-flex justify-content-between inner_course mt-0">
          <div className="row">
            <div className="col-md-9">
              <div className="lor-content" style={{fontFamily:"Lato"}}>
                <p>So, you need an LOR (Letter of Recommendation)? No worries! At Edulley, we make the process simple and stress-free. Whether it's an <strong>academic LOR, professional LOR, or a personal LOR</strong>, we've got you covered.</p>

                <h4 style={{fontWeight: 700, marginTop: "2rem", marginBottom: "1rem"}}>What is an LOR?</h4>
                <p>A <strong><a style={{color:"blue"}} href="https://edulley.com/lor" target="_blank">Letter of Recommendation </a>(LOR)</strong> is a crucial document that supports your application to universities or job opportunities. It's basically someone vouching for your skills, character, and achievements. Whether you're applying for <strong>bachelor's, master's, or a professional program</strong>, a well-written LOR can make a huge difference.</p>

                <h4 style={{fontWeight: 700, marginTop: "2rem", marginBottom: "1rem"}}>Types of LORs</h4>
                <h5 style={{fontWeight: 600, marginTop: "1.5rem", marginBottom: "1rem"}}>1. Academic LOR</h5>
                <ul>
                  <li>Required for undergraduate and graduate admissions.</li>
                  <li>Written by professors, school principals, or academic mentors.</li>
                  <li>Highlight your academic achievements, skills, and potential.</li>
                  <li>Perfect for <strong>LOR for undergraduate students, LOR for a student, and LOR for bachelors</strong>.</li>
                </ul>

                <h5 style={{fontWeight: 600, marginTop: "1.5rem", marginBottom: "1rem"}}>2. Professional LOR</h5>
                <ul>
                  <li>Required for job applications or MBA programs.</li>
                  <li>Written by employers, managers, or supervisors.</li>
                  <li>Highlights your work ethic, skills, leadership, and achievements.</li>
                </ul>

                <h5 style={{fontWeight: 600, marginTop: "1.5rem", marginBottom: "1rem"}}>3. Personal LOR</h5>
                <ul>
                  <li>Less common but sometimes required for specific applications.</li>
                  <li>Written by mentors, colleagues, or someone who knows you well.</li>
                  <li>Focuses on character, personal achievements, and soft skills.</li>
                </ul>

                <h4 style={{fontWeight: 700, marginTop: "2rem", marginBottom: "1rem"}}>LOR Format for Students</h4>
                <p>Wondering how to structure your <strong>LOR for students</strong>? Here's a basic format:</p>
                <ol>
                  <li><strong>Introduction</strong> – Who is writing the letter and their relationship with you.</li>
                  <li><strong>Academic/Professional Strengths</strong> – Highlight key achievements and skills.</li>
                  <li><strong>Personal Traits & Soft Skills</strong> – Showcase qualities like leadership, teamwork, and communication.</li>
                  <li><strong>Conclusion & Endorsement</strong> – A strong statement of recommendation.</li>
                </ol>

                <h4 style={{fontWeight: 700, marginTop: "2rem", marginBottom: "1rem"}}>Tips to Make Your LOR Stand Out</h4>
                <ul>
                  <li>Keep it concise (1 page is ideal!).</li>
                  <li>Be specific—mention actual achievements.</li>
                  <li>Use a professional but conversational tone.</li>
                  <li>Ensure it aligns with your application goals.</li>
                </ul>

                <h4 style={{fontWeight: 700, marginTop: "2rem", marginBottom: "1rem"}}>Need Help Writing Your LOR?</h4>
                <p>Crafting the perfect <strong>LOR essay</strong> can be tricky, but don't stress! At Edulley, we help students get <strong>well-structured, impactful LORs</strong> that stand out. Whether it's a <strong>LOR for undergraduate, LOR format for students</strong>, or a <strong>personal LOR</strong>, we tailor it to highlight your best qualities.</p>

                <h4 style={{fontWeight: 700, marginTop: "2rem", marginBottom: "1rem"}}>Let's Get Your LOR Ready!</h4>
                <p>Don't leave your LOR to chance—get expert guidance with Edulley. Reach out to us, and we'll make sure your recommendation letter is top-notch!</p>
                <p>Visit <strong> <a style={{color:"blue"}} href="https://edulley.com/" target="_blank">Edulley</a></strong> to get started today!</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="right_scholar exam-bar">
                <div className="d-flex align-items-center gap-3">
                  <img style={{width:"2rem",height:"2rem"}} src={list} alt="" />
                  <h4 className="text-pink mb-0" style={{fontFamily:"Lato", fontWeight: 700}}>
                    Table of Contents
                  </h4>
                </div>
                <div className="s_img_card py-3">
                  <ul>
                    <li className="text-pink" style={{fontFamily:"Lato", fontWeight: 500}}>Overview</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>Why LOR</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>LOR Test Format</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>LOR Syllabus</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>LOR Preparation</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>LOR Eligibility</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>LOR Registration</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>LOR Exam Fee</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>LOR Exam dates 2024</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>LOR test centres</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>LOR E-Book</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>Band Descriptors</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>LOR Speaking test</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>LOR Reading test</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>General Reading test</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>General Writing Task</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>LOR Essay</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>LOR Result</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>GPA</li>
                  </ul>
                </div>
                <div className="s_img_card side-bar-img text-center">
                  <img src={scholar1} alt="" />
                  <p className="mt-2" style={{fontFamily:"Lato", fontWeight: 700}}>
                    Let's look at the scholarships available for you
                  </p>
                  <button onClick={() => navigate('/scholarship')} className="explore-button py-2 fw-light mt-2" style={{fontFamily:"Lato", fontWeight: 500}}>
                    Explore All Scholarship
                  </button>
                  <p className="fw-bold my-2" style={{fontFamily:"Lato", fontWeight: 700}}>OR</p>
                  <a 
                    href="https://wa.me/message/SMDIYPHGQFQRC1" 
                    target="_blank"
                    className="fw-bold"
                    style={{ color: "#ff5573", cursor: "pointer", fontFamily:"Lato", fontWeight: 500 }}
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

export default LOR;