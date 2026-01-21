import React from "react";
import scholar1 from "../../assets/scholarship1.png";
import list from "../../assets/list.svg";
import cherons from "../../assets/chevrons-right.png";
import SOPCard from "./sopcard";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";

const SOP = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("_u"));
  const loggedIn = !!user?.token;
  
  return (
    <>
   <SEO
  title="Best Universities Abroad & Scholarships for Indian Students | SOP"
  description="Discover the best universities abroad for Indian students. Explore courses, scholarships, and opportunities to study in top countries for your master's degree."
  canonicalUrl="https://edulley.com/sop"
  keywords="statement of purpose, SOP writing, university application, study abroad application"
  ogType="website"
  ogImage="https://edulley.com/images/sop-og.jpg"
  schema={{
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Writing an Effective Statement of Purpose",
    "description": "Guide to creating a compelling statement of purpose for university applications",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Research Programs",
        "text": "Understand the specific requirements and expectations of your target programs"
      },
      {
        "@type": "HowToStep",
        "name": "Draft Personal Statement",
        "text": "Create a compelling narrative about your academic journey and future goals"
      }
    ]
  }}
/>
      <div className="container-fluid sop_container">
        <div className="ielts_content container">
          <h1 style={{color:"#fff", fontFamily:"Lato", fontWeight: 700}}>Statement of Purpose</h1>
          <h2 style={{color:"#fff", fontFamily:"Lato", fontWeight: 500}}>All you need to know!</h2>
          <button 
            className="explore-button mt-3 bg-black pull-right" 
            style={{fontFamily:"Lato", fontWeight: 500}} 
            onClick={() => {
              if(!loggedIn) {
                navigate("/");
                return;
              }
              window.open('https://www.uc.edu/content/dam/refresh/learning-commons-62/awc/awc-grad/sample-statement-handout-spring-2021.pdf', '_blank')
            }}
          >
            Download SOP
          </button>
        </div>
      </div>
      <div className="container py-4 course_container">
        <h3 className="mb-4" style={{fontFamily:"Lato", fontWeight: 700}}>Craft a Winning Statement of Purpose (SOP) with Edulley!</h3>
        <div className="d-flex justify-content-between inner_course mt-0">
          <div className="row">
            <div className="col-md-9">
              <div className="sop-content" style={{fontFamily:"Lato"}}>
                <p>Struggling to write the perfect <strong>Statement of Purpose (SOP)</strong>? Don't worry! At Edulley, we help students create compelling and personalized SOPs that impress universities worldwide. Whether you need an <strong>SOP for university</strong> admission or a well-structured <strong>statement of purpose essay</strong>, we've got you covered!</p>

                <h4 style={{fontWeight: 700, marginTop: "2rem", marginBottom: "1rem"}}>What is a Statement of Purpose (SOP)?</h4>
                <p>A <strong><a style={{color:"blue"}} href="https://edulley.com/sop" target="_blank">Statement of Purpose</a></strong> for students is a crucial document that outlines your academic background, career goals, and reasons for choosing a particular program. It plays a key role in securing admission to top universities.</p>

                <h4 style={{fontWeight: 700, marginTop: "2rem", marginBottom: "1rem"}}>Why is an SOP Important?</h4>
                <ul>
                  <li>Highlights your academic achievements and professional aspirations.</li>
                  <li>Helps universities understand your motivation and future goals.</li>
                  <li>Sets you apart from other applicants with a unique, well-written SOP.</li>
                </ul>

                <h4 style={{fontWeight: 700, marginTop: "2rem", marginBottom: "1rem"}}>Best SOP Writing Services – Why Choose Edulley?</h4>
                <p>We offer the <strong>best SOP writing services</strong> with:</p>
                <ul>
                  <li><strong>Expert Writers</strong> – Experienced professionals who know what universities expect.</li>
                  <li><strong>Custom SOPs</strong> – Personalized content tailored to your profile.</li>
                  <li><strong>Error-Free & Plagiarism-Free</strong> – SOPs crafted with originality and precision.</li>
                  <li><strong>Quick Turnaround</strong> – Get your SOP on time without stress.</li>
                </ul>

                <h4 style={{fontWeight: 700, marginTop: "2rem", marginBottom: "1rem"}}>Statement of Purpose Format – What to Include?</h4>
                <p>A well-structured <strong>statement of purpose format</strong> typically includes:</p>
                <ul>
                  <li><strong>Introduction</strong> – Who you are and your academic background.</li>
                  <li><strong>Academic & Professional Journey</strong> – Relevant achievements and experiences.</li>
                  <li><strong>Why This University?</strong> – Reasons for choosing the institution and program.</li>
                  <li><strong>Career Goals</strong> – How the course aligns with your aspirations.</li>
                  <li><strong>Conclusion</strong> – A strong closing statement.</li>
                </ul>

                <h4 style={{fontWeight: 700, marginTop: "2rem", marginBottom: "1rem"}}>SOP for University Admission – Tailored for Success</h4>
                <p>Need a <strong><a style={{color:"blue"}} href="https://edulley.com/sop" target="_blank">statement of purpose for university admission?</a></strong> We craft SOPs specific to different universities, ensuring they align with each institution's expectations and admission criteria.</p>

                <h4 style={{fontWeight: 700, marginTop: "2rem", marginBottom: "1rem"}}>Get Your SOP Today!</h4>
                <p>A well-written SOP can be the game-changer in your university application. Let <strong>Edulley</strong> help you create a powerful <strong>statement of purpose for university</strong> admission.</p>
                <p>Visit <strong><a style={{color:"blue"}} href="https://edulley.com/" target="_blank">Edulley</a></strong> to get started with expert SOP writing assistance!</p>
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
                    <li className="text-pink" style={{fontFamily:"Lato", fontWeight: 500}}>What is SOP</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>Why is SOP important</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>SOP Format</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>How to write SOP</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>What do college look for in an SOP</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>Tips for writing SOP</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>Common mistakes to avoid in SOP</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>Importance of SOP</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>Word limit in SOP</li>
                    <li style={{fontFamily:"Lato", fontWeight: 500}}>Samples for SOP</li>
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
                    style={{ color: "#ff5573", cursor: "pointer", fontFamily:"Lato", fontWeight: 500}}
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

export default SOP;