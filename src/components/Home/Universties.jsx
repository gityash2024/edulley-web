import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUniversities } from "../../Services/dashboard";
import CustomLoader from "../loader";
import toast from "react-hot-toast";
import defaultLogoImage from "../../assets/frame-1686560972@2x.png";
import university_icon from "../../assets/university.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from "@mui/material";

const UniversitiesHome = () => {
  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const universitiesPerPage = 12;
  const navigate = useNavigate();

  const fetchUniversities = async () => {
    try {
      const res = await getUniversities();
      if (!res?.data?.error) {
        setUniversities(res.data.data);
        setFilteredUniversities(res.data.data);
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

  const handleUniversityClick = (uni) => {
    navigate("/institution-details", { state: { universityDetails: uni } });
  };

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    filterUniversities(value);
  };

  const filterUniversities = (input) => {
    const filtered = universities.filter(uni =>
      uni.universityName.toLowerCase().includes(input.toLowerCase()) ||
      uni.country.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredUniversities(filtered);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchInput('');
    setFilteredUniversities(universities);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastUniversity = currentPage * universitiesPerPage;
  const indexOfFirstUniversity = indexOfLastUniversity - universitiesPerPage;
  const currentUniversities = filteredUniversities.slice(indexOfFirstUniversity, indexOfLastUniversity);

  if (isLoading) {
    return <CustomLoader />;
  }

  return (
    <div className="most-searched-countries-container featured-university-container py-5 section-padding">
      <div className="container">
        <div className="row mb-4 align-items-center">
          <div className="col-lg-6 mb-3 mb-lg-0">
            <h1 className="font-lato fw-bold d-flex align-items-center">
              <img src={university_icon} className="img-fluid mr-2" alt="University Icon" style={{ maxWidth: '40px' }} />
              <span className="mt-1" style={{ fontFamily: "Lato", fontWeight: 700 }}>Universities</span>
            </h1>
          </div>
          <div className="col-lg-6">
            <div className="input-group">
              <div className="position-relative flex-grow-1">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Universities and Country"
                  style={{ fontFamily: "Lato", fontWeight: 500, borderRadius: "25px", paddingLeft: "35px", paddingRight: "100px" }}
                  value={searchInput}
                  onChange={handleSearchInputChange}
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#888'
                  }}
                />
              </div>
              <div className="input-group-append position-absolute" style={{ right: 0, zIndex: 5 }}>
                <button
                  className="btn"
                  type="button"
                  onClick={handleReset}
                  style={{
                    borderRadius: "0 25px 25px 0",
                    backgroundColor: "#FF5573",
                    color: "#FFF",
                    fontFamily: "Lato", fontWeight: 500
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} className="mr-1" />
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
        <p style={{ fontFamily: "Lato", fontWeight: 500 }}>{filteredUniversities.length} Universities</p>
        <div className="row">
        {currentUniversities.map((uni, index) => (
  <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
    <div 
      style={{ cursor: "pointer" }} 
      className="cursor-pointer countries uni_card h-100 d-flex flex-column"
      onClick={() => handleUniversityClick(uni)}
    >
      <img 
        src={uni.bannerImage || defaultLogoImage} 
        alt="University" 
        className="university-image" 
        style={{ height: "200px", width: "100%", objectFit: "cover", background: '#fff' }} 
      />
      <div className="card-info d-flex justify-content-between align-items-start p-2">
        <div>
          <h3 className="university-name" style={{ fontFamily: "Lato", fontWeight: 500 }} title={uni?.universityName}>
            {uni?.universityName?.trim()?.length > 20 ? `${uni.universityName.trim().slice(0, 20)}...` : uni.universityName?.trim() || "University Name"}
          </h3>
          <h5 className="university-location" style={{ fontFamily: "Lato", fontWeight: 500 }}>{`${uni.city}, ${uni?.country}`}</h5>
        </div>
        <div className="university-logo" style={{ background: "none" }}>
          <img 
            src={uni.universityLogo || defaultLogoImage} 
            alt="Logo" 
            style={{ height: "50px", width: "50px", borderRadius: "50%", objectFit: "contain" }} 
          />
        </div>
      </div>
    </div>
  </div>
))}
          {!currentUniversities.length && (
            <div className="col-12">
              <p className="text-center">No universities found.</p>
            </div>
          )}
        </div>
        <div className="row mt-4">
          <div className="col-12 d-flex justify-content-center">
            <Pagination
              count={Math.ceil(filteredUniversities.length / universitiesPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversitiesHome;