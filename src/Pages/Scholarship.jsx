import React, { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import book from "../assets/book.svg";
import map from "../assets/mappin.svg";
import uni from "../assets/uni.svg";
import scholar1 from "../assets/scholarship1.png";
import scholarship_icon from "../assets/scholarship.png";
import scholar2 from "../assets/scholarship2.png";
import { Link, useNavigate } from "react-router-dom";
import ScholarshipCard from "../components/ScholarshipCard";
import { getScholarship, getUniversities } from "../Services/dashboard";
import CustomLoader from "../components/loader";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import Pagination from '@mui/material/Pagination';
import SEO from "../components/SEO";

const Scholarship = () => {
  const [scholarship, setScholarship] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [filteredScholarship, setFilteredScholarship] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ name: '', course: '', university: '' });
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const scholarshipsPerPage = 6;

  const navigate = useNavigate();

  const fetchScholarship = async () => {
    setLoading(true);
    try {
      const response = await getScholarship();
      setScholarship(response.data.data);
      setFilteredScholarship(response.data.data);
      setLoading(false);
    } catch (error) {
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  const fetchUniversities = async () => {
    setLoading(true);
    try {
      const response = await getUniversities();
      setUniversities(response.data.data);
      setLoading(false);
    } catch (error) {
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarship();
    fetchUniversities();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    const filtered = scholarship.filter(uni =>
      uni.name.toLowerCase().includes(value.toLowerCase()) ||
      uni.universityName.toLowerCase().includes(value.toLowerCase())||
      uni.coursesName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredScholarship(filtered);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchInput('');
    setFilteredScholarship(scholarship);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    if (!filters.name && !filters.course && !filters.university) {
      toast.error('Please enter at least one filter');
      return;
    }
    let filteredData = scholarship.filter(item =>
      (filters.name ? universities.some(uni => uni.country.toLowerCase() === filters.name.toLowerCase() && uni.universityName.toLowerCase() === item.universityName.toLowerCase()) : true) &&
      (filters.course ? (filters.course === 'UG' ? item.level === 'UG' : item.level === 'PG') : true) &&
      (filters.university ? item.universityName.toLowerCase().includes(filters.university.toLowerCase()) : true)
    );
    setFilteredScholarship(filteredData);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({ name: '', course: '', university: '' });
    setFilteredScholarship(scholarship);
    setCurrentPage(1);
  };

  const indexOfLastScholarship = currentPage * scholarshipsPerPage;
  const indexOfFirstScholarship = indexOfLastScholarship - scholarshipsPerPage;
  const currentScholarships = filteredScholarship.slice(indexOfFirstScholarship, indexOfLastScholarship);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="container">
     <SEO 
  title="Find College Scholarships Online | Top Scholarship Websites"
  description="Discover a wide range of scholarships for college at Edulley. Explore online scholarships and find the perfect funding opportunity for your education."
  canonicalUrl="https://edulley.com/scholarship"
  keywords="college scholarships, education funding, scholarship websites, financial aid, study grants"
  ogType="website"
  ogImage="https://edulley.com/images/scholarship-og.jpg"
  schema={{
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "College Scholarships and Funding Opportunities",
    "description": "Discover scholarships and funding opportunities for your education abroad",
    "offers": {
      "@type": "AggregateOffer",
      "name": "Study Abroad Scholarships",
      "description": "Various scholarships available for international education"
    }
  }}
/>
      {loading && <CustomLoader />}
      <div className="py-5"></div>
      <div className="row align-items-center mb-4">
        <div className="col-md-6 d-flex align-items-center">
          <h1 className="font-lato fw-bold">
            <img src={scholarship_icon} className="img-fluid" alt="Scholarship Icon" />
            <span className="mt-1 ml-2" style={{ fontFamily: "Lato", fontWeight: 700 }}>Scholarship</span>
          </h1>
        </div>
        <div className="col-md-6">
          <div className="d-flex align-items-center justify-content-end">
            <div className="input-group" style={{ position: 'relative', maxWidth: '400px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search By Name, Course, University"
                style={{ fontFamily: "Lato", fontWeight: 500, borderRadius: "25px 0 0 25px", paddingLeft: "35px" }}
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
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={handleReset}
                  style={{
                    borderRadius: "0 25px 25px 0",
                    backgroundColor: "#FF5573",
                    color: "#FFF"
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                  <span className="ml-2" style={{ fontFamily: "Lato", fontWeight: 500 }}>Clear</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="search_container container scholarship-page">
        <h3 className="text-center mt-2" style={{ fontFamily: "Lato", fontWeight: 500 }}>Search Scholarships</h3>
        <div className="bg-white rounded section_inner">
          <div className="ps-3">
            <img style={{ height: "2rem", width: "2rem", objectFit: "cover" }} alt="" src={map} />
            <select
              className="text-gray-100"
              name="name"
              value={filters?.name}
              style={{ border: 'none', fontFamily: "Lato", fontWeight: 500, width: "100%", marginRight: "10px", padding: "10px", background: "#fff", color: filters?.name ? "#898484" : "#898484" }}
              onChange={handleFilterChange}
            >
              <option value="">Select Country</option>
              <option value="USA">USA</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Singapore">Singapore</option>
              <option value="Malaysia">Malaysia</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
              <option value="Canada">Canada</option>
              <option value="Dubai">Dubai</option>
              <option value="Ireland">Ireland</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Denmark">Denmark</option>
              <option value="Finland">Finland</option>
              <option value="Spain">Spain</option>
              <option value="Switzerland">Switzerland</option>
            </select>
          </div>
          <div className="ps-3">
            <img style={{ height: "2rem", width: "2rem", objectFit: "cover" }} alt="" src={book} />
            <select
              className="text-gray-100"
              style={{ border: 'none', fontFamily: "Lato", fontWeight: 500, width: "220px", height: "40px", color: "#898484", backgroundColor: "transparent" }}
              name="course"
              value={filters.course}
              onChange={handleFilterChange}
            >
              <option value="" disabled selected>Degree</option>
              <option value="UG">UG</option>
              <option value="PG">PG</option>
            </select>
          </div>
          <div className="ps-3">
            <img style={{ height: "2rem", width: "2rem", objectFit: "cover" }} alt="" src={uni} />
            <input
              className="text-gray-100"
              placeholder="University"
              type="text"
              name="university"
              style={{ border: 'none', fontFamily: "Lato", fontWeight: 500, color: "#898484" }}
              value={filters.university}
              onChange={handleFilterChange}
            />
          </div>
          <button className="button-content px-4 search_btn ml-3" onClick={handleSearch}>
            <FaSearch />
          </button>
          {(filters.name || filters.course || filters.university) && (
            <button className="button-content px-4 search_btn ml-3" onClick={resetFilters}>
              <FaTimes />
            </button>
          )}
        </div>
      </div>
      <div className="container py-4 course_container">
        <div className="inner_course mt-0">
          <div className="row">
            <div className="col-md-9">
              <div className="row">
                {currentScholarships.map((item) => (
                  <div className="col-md-6" key={item._id}>
                    <ScholarshipCard scholarship={item} universities={universities} />
                  </div>
                ))}
                {!currentScholarships.length && (
                  <p className="text-center">No scholarship found</p>
                )}
              </div>
              <div className="d-flex justify-content-center mt-4">
                <Pagination
                  count={Math.ceil(filteredScholarship.length / scholarshipsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="right_scholar">
                <div className="s_img_card">
                  <img src={scholar1} alt="" />
                  <p className="mt-2" style={{ fontFamily: "Lato", fontWeight: 700 }}> Let's look at the scholarships available for you</p>
                  <button onClick={() => { navigate("/scholarship") }} className="explore-button py-2 fw-light mt-2" style={{ fontFamily: "Lato", fontWeight: 500 }}>
                    Explore all Scholarship
                  </button>
                </div>
                <div className="s_img_card">
                  <img src={scholar2} alt="" />
                  <p className="mt-2" style={{ fontFamily: "Lato", fontWeight: 500 }}>
                    Confused about our Career path?
                  </p>
                  <button onClick={() => { navigate("/career-path") }} className="explore-button py-2 fw-light mt-2" style={{ fontFamily: "Lato", fontWeight: 500 }}>
                    Explore Career path finder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scholarship;