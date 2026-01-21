import React from "react";
import TopicCard from "../../components/exams/TopicCard";
import scholar1 from "../../assets/scholarship1.png";
import list from "../../assets/list.svg";
import { useNavigate } from "react-router-dom";

const IletsCue = () => {
  const navigate=useNavigate();

  return (
    <div className="container py-4 course_container">
      <div className="py-5"></div>
      <h3 className="mb-3" style={{fontFamily: "Lato", fontWeight: 700}}>IELTS READING SAMPLE</h3>
      <div className="d-flex justify-content-between inner_course mt-0">
        <div className="row">
          <div className="col-md-9">
            <div>
              <TopicCard />
            </div>
          </div>
          <div className="col-md-3">
            <div className="right_scholar exam-bar">
              <div className="s_img_card py-5">
                <div className="d-flex align-items-center gap-3">
                  <img style={{width: '2rem', height: '2rem'}}  src={list} alt="" />
                  <h4 className="text-pink fw-semibold fn-s mb-0 " style={{fontFamily: 'Lato', fontWeight: 500}}>
                    IELTS READING SAMPLE
                  </h4>
                </div>
                <ul>
                  <li style={{color:"#00949B",fontFamily:"Lato", fontWeight: 500}}>Topic Name</li>
                  <li style={{color:"#00949B",fontFamily:"Lato", fontWeight: 500}}>Topic Name</li>
                  <li style={{color:"#00949B",fontFamily:"Lato", fontWeight: 500}}>Topic Name</li>
                  <li style={{color:"#00949B",fontFamily:"Lato", fontWeight: 500}}>Topic Name</li>
                  <li style={{color:"#00949B",fontFamily:"Lato", fontWeight: 500}}>Topic Name</li>
                </ul>
              </div>
              <div className="s_img_card side-bar-img text-center">
                  <img src={scholar1} alt="" />
                  <p className="mt-2" style={{fontFamily: "Lato", fontWeight: 700}}>
                    Let’s look at the scholarships available for you
                  </p>
                  <button onClick={() => navigate('/scholarship')} style={{fontFamily: 'Lato', fontWeight: 500}} className="explore-button py-2 fw-light mt-2">
                    Explore All Scholarship {">>"}
                  </button>
                  <p className="my-2" style={{fontFamily: "Lato", fontWeight: 700}}>OR</p>
                  <a href="https://wa.me/message/SMDIYPHGQFQRC1" target="_blank"
                   
                    style={{ color: "#ff5573", cursor: "pointer" ,fontFamily: 'Lato', fontWeight: 500}}
                  >
                    Chat with us 
                  </a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IletsCue;
