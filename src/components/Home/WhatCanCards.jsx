import React from "react";
import { useNavigate } from "react-router-dom";
import cherons from "../../assets/chevrons-right-grey.png";

const WhatCanCards = ({ sOPWriting, guidance, img, path, buttonText }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (sOPWriting === "Visa") {
      localStorage.setItem('visaGuidance', 'true');
    } else if (sOPWriting === "Accommodation") {
      localStorage.setItem('accommodationGuidance', 'true'); // Changed from 'accomodationPlanning'
    } else if (sOPWriting === "Financial") {
      localStorage.setItem('financialPlanning', 'true');
    }
    navigate(path);
  };
  return (
    <div className="frame-component rounded ">
      <img
        className="frame-component-image"
        src={img}
        alt={`${sOPWriting} ${guidance}`}
      />
      <div className="my-1">
        <h6 className="frame-component-title mb-0 pb-0 mt-2" style={{fontFamily:"Lato", fontWeight: 500}}>{sOPWriting}</h6>
        <h6 className="frame-component-title mb-0 pb-0 " style={{fontFamily:"Lato", fontWeight: 500}}> {guidance}</h6>
      </div>
      <button style={{fontFamily:"Lato", fontWeight: 500}} onClick={handleClick} className="frame-component-button">
        {buttonText} <span style={{fontFamily:"Lato", fontWeight: 500}}><img src={cherons} alt="Home" /></span> 
      </button>
    </div>
  );
};

export default WhatCanCards;