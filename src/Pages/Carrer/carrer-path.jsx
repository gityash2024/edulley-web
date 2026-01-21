import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import CustomLoader from "../../components/loader";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import course_icon from '../../assets/course.png';
import carrer_path_image from '../../assets/carrer_path.png';
import book from '../../assets/book.svg';
import school from '../../assets/school.svg';
import { getCareerPathsListing } from "../../Services/dashboard";
import SEO from "../../components/SEO";

const CarrerPath = () => {
  const [careerPaths, setCareerPaths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [qualification, setQualification] = useState('');
  const [specialization, setSpecialization] = useState('');
  const navigate = useNavigate();

  const fetchCareerPaths = async () => {
    setLoading(true);
    try {
      const response = await getCareerPathsListing();
      if (!response?.data?.error) {
        setCareerPaths(response.data.data || []);
      } else {
        toast.error("Failed to load career paths data.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching career paths.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareerPaths();
  }, []);

  const handleSearch = () => {
    if (!qualification || !specialization) {
      toast.error("Both qualification and specialization are required.");
      return;
    }
    
    const filteredPath = careerPaths.find(path => 
      path.latestQualification.trim().toLowerCase() === qualification.trim().toLowerCase() &&
      path.specialization.trim().toLowerCase() === specialization.trim().toLowerCase()
    );

    if (filteredPath) {
      navigate('/carrer-details', { 
        state: { 
          qualification: qualification.trim(), 
          specialization: specialization.trim(),
          coursesName: filteredPath.coursesName
        } 
      });
    } else {
      toast.error("No matching career path found.");
    }
  };

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <div className="most-searched-countries-container featured-university-container py-5 section-padding" style={{backgroundColor:"#FFFBFB"}}>
     <SEO 
  title="Career Development Courses & Transition Services | Edulley"
  description="Edulley offers comprehensive career development courses and transition services. Equip yourself with the skills needed to advance your career successfully."
  canonicalUrl="https://edulley.com/career-path"
  keywords="career development, professional growth, career transition, skill advancement"
  ogType="website"
  ogImage="https://edulley.com/images/career-path-og.jpg"
  schema={{
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Career Development Services",
    "description": "Comprehensive career development courses and transition services provided by Edulley",
    "provider": {
      "@type": "Organization",
      "name": "Edulley",
      "sameAs": "https://edulley.com"
    },
    "serviceType": "Career Development",
    "offers": {
      "@type": "Offer",
      "description": "Career development courses and transition services"
    }
  }}
/>

      <div className="container">
        <div className="d-flex align-items-center justify-content-between flex-wrap career-path-header">
          <h1 className="font-lato fw-bold d-flex align-items-center mb-3 mb-md-0">
            <img src={course_icon} className="img-fluid" alt="University Icon" />
            <span className="mt-1 ml-2" style={{ fontFamily: "Lato", fontWeight: 700 }}>Career Path Finder</span>
          </h1>
        </div>
        <div className="row mt-5 align-items-center">
          <div className="col-md-6">
            <img src={carrer_path_image} className="carrer-responsive-img img-fluid" alt="Career Path" style={{ height: '400px' }} />
          </div>
          <div className="col-md-6 text-center">
            <h1 className="carrer-responsive-text" style={{ color: '#FF5573', fontFamily: "Lato", fontWeight: 700, fontSize: '2rem' }}>Confused</h1>
            <h4 className="carrer-responsive-text-inner" style={{ color: '#FF5573', fontFamily: "Lato", fontWeight: 500, fontSize: '1.5rem', lineHeight: '1.5' }}>About Your Career Path?<br />Let Us Light the Way!</h4>
          </div>
        </div>
        <div className="row">
          <div className="search_container container mb-3 mt-0">
            <h4 className="text-center mb-4" style={{ fontFamily: "Lato", fontWeight: 500 }}>Search Your Career Path</h4>
            <div className="bg-white rounded section_inner">
              <div className="ps-3">
                <img style={{ height: '2rem', width: '2rem', objectFit: 'cover' }} alt="" src={school} />
                <select
                  className="text-gray-100 dropdown-css"
                  style={{ border: 'none', fontFamily: "Lato", fontWeight: 500, color: qualification ? '#000' : '#898484' }}
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                >
                  <option value="">Select Qualification</option>
                  <option value="12th (High School Completed)">12th (High School Completed)</option>
                  <option value="Bachelors of Technology">Bachelors of Technology</option>
                  <option value="Bachelors of Arts">Bachelors of Arts</option>
                  <option value="Bachelors of Business Administration">Bachelors of Business Administration</option>
                  <option value="Bachelors of Architecture">Bachelors of Architecture</option>
                  <option value="Bachelors of Science">Bachelors of Science</option>
                  <option value="Bachelors of Commerce">Bachelors of Commerce</option>
                  <option value="Bachelors of Law">Bachelors of Law</option>
                  <option value="MBBS">MBBS</option>
                  <option value="Bachelors of Engineering">Bachelors of Engineering</option>
                  <option value="Bachelor of Pharmacy (B.Pharm.)">Bachelor of Pharmacy (B.Pharm.)</option>
                </select>
              </div>
              <div className="ps-3">
                <img style={{ height: '2rem', width: '2rem', objectFit: 'cover' }} alt="" src={book} />
                <select
                  className="text-gray-100 dropdown-css"
                  style={{ border: 'none', fontFamily: "Lato", fontWeight: 500, color: specialization ? '#000' : '#898484' }}
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                >
                  <option value="">Select Specialization</option>
                  <option value="Business and Management">Business and Management</option>
                  <option value="Computer Science and IT">Computer Science and IT</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Social Science">Social Science</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Professional Studies">Professional Studies</option>
                  <option value="Hospitality and Tourism">Hospitality and Tourism</option>
                  <option value="Science">Science</option>
                  <option value="Sports Studies">Sports Studies</option>
                  <option value="Fine Arts">Fine Arts</option>
                  <option value="Law">Law</option>
                  <option value="Education">Education</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Journalism and Media">Journalism and Media</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Arts">Arts</option>
                  <option value="Commerce">Commerce</option>
                </select>
              </div>
              <button className="button-content px-4 search_btn ml-3" onClick={handleSearch}>
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarrerPath;