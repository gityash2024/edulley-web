import React from "react";
import WorkCards from "./WorkCards";
import img1 from "../../assets/apply.png";
import img2 from "../../assets/find-course.png";
import img3 from "../../assets/chat-with-us.png";

const Works = () => {
  return (
    <div className="works-container featured-university-container container py-5 br-t-0">
      <div className="">
        <h2 className="what-we-can-do-title" style={{ fontFamily: "Lato", fontWeight: 700 }}>
          How It Works ?
        </h2>
        {/* <p className="what-we-can-do-description" style={{ fontFamily: "Lato", fontWeight: 500 }}>
          Here we have streamlined the complete process in a hassle-free way. You can simply search courses and apply. Engage with your dedicated study abroad expert and we would 
          love to assist you at any step of the way. Your journey begins here!
        </p> */}
      </div>
      <div className="work-cards-container my-5 how-to-work">
        <WorkCards
          image={img1}
          title="Find courses"
          description="Find courses from the pool of more than 65000 course worldwide. Shortlist courses, compare them and find best choices to go with."
        />
        <WorkCards
          image={img2}
          title="Apply & Receive offers"
          description="Quickly submit your application to the shortlisted universities and our team will assist your throughout the process. Get quick offers and you are all set."
        />
        <WorkCards
          image={img3}
          title="Chat with us"
          description="Chat with your dedicated student counselor to check the status of your submitted application. You will be notified at each step."
        />
      </div>
    </div>
  );
};

export default Works;