import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getUniversities } from "../../Services/dashboard";
import CustomLoader from "../loader";
import toast from "react-hot-toast";
import defaultLogoImage from "../../assets/frame-1686560972@2x.png";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const UniversitiesHome = () => {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const carouselRef = useRef(null);

  const fetchUniversities = async () => {
    try {
      const res = await getUniversities();
      if (!res?.data?.error) {
        setUniversities(res.data.data);
      } else {
        toast.error("Failed to load universities data.");
      }
    } catch (error) {
      // toast.error("An error occurred while fetching universities.");
      console.log(error);

    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -carouselRef.current.clientWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: carouselRef.current.clientWidth, behavior: "smooth" });
  };

  if (isLoading) {
    return <CustomLoader />;
  }

  return (
    <div className="most-searched-countries-container featured-university-container py-5">
      <div className="container">
        <h2 className="what-we-can-do-title" style={{ fontFamily: "Lato", fontWeight: 700 }}>
          Top Universities
        </h2>
        <p className="what-we-can-do-description" style={{ fontFamily: "Lato", fontWeight: 500 }}>
          Explore prestigious institutions known for academic excellence and innovative programs. From cutting-edge research facilities to vibrant campus life, these universities 
          offer a world-class education and endless opportunities for growth. Explore some of the best universities here!
        </p>
        <div className="university-carousel-container">
          <button
            onClick={scrollLeft}
            className="carousel-arrow left-arrow"
          >
            <ArrowBackIosNewIcon style={{ color: "#FFF" }} />
          </button>
          <div className="university-carousel"  ref={carouselRef}>
            {universities.map((uni, index) => (
              <div key={index} className="university-carousel-item" style={{marginBottom: "10px"}}>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/institution-details", {
                      state: { universityDetails: uni },
                    });
                  }}
                >
                  <div className="countries uni_card">
                    <img
                      src={uni.bannerImage || defaultLogoImage}
                      alt="University"
                      className="university-image"
                    />
                    <div className="card-info">
                      <div>
                        <h3
                          className="university-name"
                          style={{ fontFamily: "Lato", fontWeight: 500 }}
                          title={uni?.universityName}
                        >
                          {uni?.universityName?.trim()?.length > 20
                            ? `${uni.universityName.trim().slice(0, 20)} ...`
                            : uni.universityName?.trim() || "University Name"}
                        </h3>
                        <h5
                          className="university-location"
                          style={{ fontFamily: "Lato", fontWeight: 500 }}
                        >
                          {`${uni.city?.trim().slice(0, 10)}..., ${uni?.country?.trim().slice(0, 10)}...`}
                        </h5>
                      </div>
                      <div className="university-logo">
                        <img
                          src={uni.universityLogo || defaultLogoImage}
                          alt="Logo"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={scrollRight}
            className="carousel-arrow right-arrow"
          >
            <ArrowForwardIosIcon style={{ color: "#FFF" }} />
          </button>
        </div>
        {!universities.length && (
          <p className="text-center">No universities found.</p>
        )}
      </div>
    </div>
  );
};

export default UniversitiesHome;