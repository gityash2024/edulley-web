import React, { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import heroImg from "../../assets/Home2.png";
import cherons from "../../assets/chevrons-right.png";
import Search from "./searchWithoutHeading";
import { Link } from "react-router-dom";

const ImageSkeleton = () => (
  <div style={{
    width: '450px',
    height: '450px',
    position: 'relative',
    margin: '0 auto'
  }}>
    <div style={{
      width: '100%',
      height: '100%',
      marginTop: '95px',
      borderRadius: '50%',
      background: '#FFE5E9',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="shine-effect"></div>
    </div>
    <div style={{
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: '#f0f0f0',
      position: 'absolute',
      top: '10%',
      right: '5%',
      overflow: 'hidden'
    }}>
      <div className="shine-effect"></div>
    </div>
    <div style={{
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: '#f0f0f0',
      position: 'absolute',
      bottom: '15%',
      right: '10%',
      overflow: 'hidden'
    }}>
      <div className="shine-effect"></div>
    </div>
    <div style={{
      width: '120px',
      height: '40px',
      borderRadius: '8px',
      background: '#f0f0f0',
      position: 'absolute',
      bottom: '5%',
      left: '50%',
      transform: 'translateX(-50%)',
      overflow: 'hidden'
    }}>
      <div className="shine-effect"></div>
    </div>
  </div>
);

const HeroSection = () => {
  const _u = JSON.parse(localStorage.getItem('_u'));
  let token = _u?.token;
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div>
      <div className="container">
        <div className="row align-items-center flex-column-reverse flex-md-row">
          <div className="col-md-6 content text-center text-md-start">
            <h1 className="title-home mb-1" style={{ color: "#FF5573", fontFamily: "Lato", fontWeight: 700 }}>
              Your Gateway to Global Excellence !
            </h1>
            <h5 className="subtitle mt-2 mb-3" style={{ fontFamily: 'Lato', fontWeight: 500 }}>
              Explore, Learn, and Thrive with Study Abroad Application
            </h5>
            <Link to="/courses">
              <button className="explore-button mt-2" style={{ fontFamily: 'Lato', fontWeight: 500 }}>
                Explore Courses <img src={cherons} alt="Home" />
              </button>
            </Link>
          </div>
          <div className="col-md-6 image-container mb-3 mb-md-0" style={{ minHeight: '450px' }}>
            {!imageLoaded && <ImageSkeleton />}
            <img 
              className="main-image" 
              src={heroImg} 
              alt="Home" 
              style={{ 
                display: imageLoaded ? 'block' : 'none',
                width: '100%',
                maxWidth: '450px',
                margin: '0 auto'
              }}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>
      </div>
      <Search />
    </div>
  );
};

export default HeroSection;