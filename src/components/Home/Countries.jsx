import React from "react";
import card1 from "../../assets/australia.png";
import card2 from "../../assets/canada.png";
import card3 from "../../assets/france.png";
import card4 from "../../assets/uk.png";
import card5 from "../../assets/usa.png";
import card6 from "../../assets/ireland.png";
import { useNavigate } from "react-router-dom";

const Countries = () => {
  const navigate = useNavigate();

  const handleNavigation = (country) => {
    navigate("/courses", { state: { country } });
  };

  return (
    <div className="container py-5">
      <h2 className="what-we-can-do-title" style={{ fontFamily: "Lato", fontWeight: 700 }}>Top Countries</h2>
      <p className="what-we-can-do-description mt-2 mb-5" style={{ fontFamily: "Lato", fontWeight: 500 }}>
        Embark on a transformative journey of learning and discovery. Explore new cultures, make lifelong friendships, and gain a world-class education.
        Let us be your guide to a brighter future. Choose a country that excites you and we bring the best information to help you make an informed decision.
      </p>
      <div className="countries-container-2">
        <div onClick={() => handleNavigation("United Kingdom")} className="countries cursor-pointer">
          <img className="countries-image" src={card4} alt="UK" />
        </div>
        <div onClick={() => handleNavigation("USA")} className="countries cursor-pointer">
          <img className="countries-image" src={card5} alt="USA" />
        </div>
        <div onClick={() => handleNavigation("Ireland")} className="countries cursor-pointer">
          <img className="countries-image" src={card6} alt="Ireland" />
        </div>
      </div>
      <div className="countries-container-2 mt-5">
        <div onClick={() => handleNavigation("Australia")} className="countries cursor-pointer">
          <img className="countries-image" src={card1} alt="Australia" />
        </div>
        <div onClick={() => handleNavigation("Canada")} className="countries cursor-pointer">
          <img className="countries-image" src={card2} alt="Canada" />
        </div>
        <div onClick={() => handleNavigation("France")} className="countries cursor-pointer">
          <img className="countries-image" src={card3} alt="France" />
        </div>
      </div>
    </div>
  );
};

export default Countries;
