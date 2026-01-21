import React, { useEffect, useState } from "react";
import book from "../../../assets/book.svg";
import map from "../../../assets/mappin.svg";
import uni from "../../../assets/uni.svg";
import school from '../../../assets/school.svg';
import calender from '../../../assets/calendar.svg';
import university_icon from "../../../assets/shortlist.png";
import arrow_shortlist from "../../../assets/arrow-shortlist.png";
import scholar1 from "../../../assets/scholarship1.png";
import scholar2 from "../../../assets/scholarship2.png";
import CourseListCard from "../../applicationCourseListCard";
import AppliedCourseListCard from "../../appliedCourseCardListing";
import { getCourses, getApplications, getStudentDetailsById, getUniversities } from "../../../Services/dashboard";
import { toast } from "react-hot-toast";
import CustomLoader from "../../loader";
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import { Pagination } from '@mui/material';

const user = JSON.parse(localStorage.getItem("_u"));
const userId = user?._id;

const Academic = () => {
    const navigate = useNavigate();
    const intakeOptions = [
        { value: 'January', label: 'January' },
        { value: 'February', label: 'February' },
        { value: 'March', label: 'March' },
        { value: 'April', label: 'April' },
        { value: 'May', label: 'May' },
        { value: 'June', label: 'June' },
        { value: 'July', label: 'July' },
        { value: 'August', label: 'August' },
        { value: 'September', label: 'September' },
        { value: 'October', label: 'October' },
        { value: 'November', label: 'November' },
        { value: 'December', label: 'December' },
    ];
    const [activeTab, setActiveTab] = useState("apply");
    const [coursename, setcourseName] = useState("");
    const [courses, setCourses] = useState([]);
    const [applications, setApplications] = useState([]);
    const [appliedCourses, setAppliedCourses] = useState([]);
    const [filters, setFilters] = useState({ name: "", course: [], university: "", location: "" });
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const activeStyle = { backgroundColor: '#FF5573', color: 'white' };
    const inactiveStyle = { backgroundColor: 'white', color: 'black' };
    const _u = JSON.parse(localStorage.getItem('_u'));
    const [universities, setUniversities] = useState([]);
    const highlightColor = "#FF5573";

    const [studentDetails, setStudentDetails] = useState({});
    const [applyPage, setApplyPage] = useState(1);
    const [appliedPage, setAppliedPage] = useState(1);
    const itemsPerPage = 5;

    const fetchUniversities = async () => {
        setLoading(true);
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

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUniversities();
    }, []);

    const _id = _u ? _u._id : null;
    useEffect(() => {
        if (_id) {
            getStudentDetailsById(_id).then((res) => {
                setStudentDetails(res.data.data);
            });
        }
    }, [_id]);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const response = await getCourses();
            const validCourses = response.data?.data;
            setCourses(validCourses);
            setFilteredCourses(validCourses);
            setLoading(false);
        } catch (error) {
            toast.error('Something went wrong');
            setLoading(false);
        }
    };

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const response = await getApplications();
            const validApplications = response.data?.data || [];
            const userApplications = validApplications.filter(app => app.userId?._id === _u?._id);

            const sortedApplications = userApplications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
            setApplications(sortedApplications);
            setFilteredApplications(sortedApplications);
            setAppliedCourses(sortedApplications);
            setLoading(false);
        } catch (error) {
            toast.error('Something went wrong');
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value.toLowerCase().trim() }));
        handleSearch({ ...filters, [name]: value.toLowerCase().trim() });
    };

    const handleSelectChange = (selectedOptions, actionMeta) => {
        let newFilters;
        if (actionMeta.name === "course") {
            const selectedValues = selectedOptions ? selectedOptions.map(option => option.value.toLowerCase().trim()) : [];
            newFilters = { ...filters, course: selectedValues };
        } else if (actionMeta.name === "location") {
            newFilters = { ...filters, location: selectedOptions ? selectedOptions.value.toLowerCase().trim() : '' };
        }
        setFilters(newFilters);
        handleSearch(newFilters);
    };

    const handleSearch = (currentFilters = filters) => {
        const filterItems = (items) => {
            return items.filter(item => {
                const universityObj = universities.find(uni => 
                    uni.universityName?.trim().toLowerCase() === item.universityName?.trim().toLowerCase()
                );
                
                const nameMatch = currentFilters.name 
                    ? item.courseName?.trim().toLowerCase().includes(currentFilters.name?.trim().toLowerCase())
                    : true;
    
                const intakeMatch = currentFilters.course.length 
                    ? item.uniqueCourseInfo?.upcomingIntakes?.some(intake => 
                        currentFilters.course.includes(intake?.trim().toLowerCase())
                    )
                    : true;
                
                const yearMatch = currentFilters.university 
                    ? item.uniqueCourseInfo?.years?.toLowerCase() === currentFilters.university?.toLowerCase()
                    : true;
    
                const locationMatch = currentFilters.location 
                    ? universityObj?.country?.trim().toLowerCase() === currentFilters.location?.trim().toLowerCase()
                    : true;
    
                return nameMatch && intakeMatch && yearMatch && locationMatch;
            });
        };

        if (activeTab === 'apply') {
            setFilteredCourses(filterItems(courses));
        } else {
            setFilteredApplications(filterItems(appliedCourses));
        }
        
        setApplyPage(1);
        setAppliedPage(1);
    };

    const resetFilters = () => {
        setcourseName("");
        setFilters({ name: "", course: [], university: "", location: "" });
        if (activeTab === 'apply') {
            setFilteredCourses(courses);
        } else {
            setFilteredApplications(appliedCourses);
        }
        setApplyPage(1);
        setAppliedPage(1);
    };

    useEffect(() => {
        fetchCourses();
        fetchApplications();
    }, []);

    const handleApplyChangePage = (event, newPage) => {
        setApplyPage(newPage);
    };

    const handleAppliedChangePage = (event, newPage) => {
        setAppliedPage(newPage);
    };

    const getCurrentItems = () => {
        const items = activeTab === 'apply' ? filteredCourses : filteredApplications;
        const currentPage = activeTab === 'apply' ? applyPage : appliedPage;
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return items.slice(indexOfFirstItem, indexOfLastItem);
    };

    const handleCourseAdded = (newApplication) => {
        fetchCourses();
        fetchApplications();
    };

    const countryOptions = [
        { value: '', label: 'Select Country' },
        ...Array.from(new Set(universities.map(uni => uni.country)))
            .map(country => ({ value: country?.toLowerCase().trim(), label: country }))
    ];

    return (
        <>
            {loading && <CustomLoader />}
            <div className="container mt-4">
                <div className="d-flex row flex-row flex-wrap gap-3">
                    <button 
                        className="btn col-md-2 btn-lg shadow text-xl px-2 py-2 rounded-pill"
                        style={activeTab === "apply" ? activeStyle : inactiveStyle}
                        onClick={() => setActiveTab("apply")}
                    >
                       <span style={{ fontFamily: "Lato", fontWeight: 500}}>Apply to Programs</span> 
                    </button>
                    <button 
                        className="btn col-md-2 btn-lg shadow text-xl px-2 py-2 rounded-pill"
                        style={activeTab === "applied" ? activeStyle : inactiveStyle}
                        onClick={() => setActiveTab("applied")}
                    >
                       <span style={{ fontFamily: "Lato", fontWeight: 500}}>Applied Programs</span> 
                    </button>
                </div>
            </div>
            <div className="container">
                <div className="row justify-content-center p-4 ">
                    {activeTab === "apply" && (
                        <div className="search_container container scholarship-page">
                            <h3 className="text-center" style={{ fontFamily: "Lato", fontWeight: 500 }}>
                                Search suitable Course for you
                            </h3>
                            <div className="bg-white rounded section_inner">
                                <div className="ps-3 d-flex align-items-center" style={{ width: "234px" }}>
                                    <img style={{ height: '2rem', width: '2rem', objectFit: 'cover' }} alt="" src={book} />
                                    <input
                                        className="text-gray-100"
                                        placeholder="Course"
                                        type="text"
                                        style={{ border: 'none', fontFamily: "Lato", fontWeight: 500, color: coursename ? "#000" : "#898484" }}
                                        name="name"
                                        value={coursename}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setcourseName(value);
                                            handleFilterChange({ target: { name: 'name', value } });
                                        }}
                                    />
                                </div>
                                <div className="ps-3 d-flex align-items-center" style={{ width: "234px" }}>
                                    <img style={{ height: '2rem', width: '2rem', objectFit: 'cover' }} alt="" src={school} />
                                    <Select
                                        isMulti
                                        name="course"
                                        options={intakeOptions}
                                        placeholder="Intake" 
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        value={intakeOptions.filter(option => filters.course.includes(option.value.toLowerCase().trim()))}
                                        onChange={handleSelectChange}
                                        styles={{
                                            control: (provided) => ({
                                                ...provided,
                                                border: 'none',
                                                fontFamily: "Lato", fontWeight: 500,
                                                width: "100%",
                                                padding: "10px",
                                                background: "#fff",
                                                color: "#898484"
                                            })
                                        }}
                                    />
                                </div>
                                <div className="ps-3 d-flex align-items-center" style={{ width: "234px" }}>
                                    <img style={{ height: '2rem', width: '2rem', objectFit: 'cover' }} alt="" src={calender} />
                                    <select
                                        className="text-gray-100"
                                        name="university"
                                        style={{ border: 'none', fontFamily: "Lato", fontWeight: 500, width: "100%", padding: "10px", background: "#fff", color: filters.university ? "#000" : "#898484" }}
                                        value={filters.university}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="">Select Year</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                        <option value="2028">2028</option>
                                    </select>
                                </div>
                                <div className="ps-3 d-flex align-items-center" style={{ width: "234px" }}>
                                    <img style={{ height: '2rem', width: '2rem', objectFit: 'cover' }} alt="" src={map} />
                                    <Select
                                        name="location"
                                        options={countryOptions}
                                        placeholder="Select Country"
                                        value={countryOptions.find(option => option.value === filters.location) || null}
                                        onChange={(selectedOption) => handleSelectChange(selectedOption, { name: "location" })}
                                        styles={{
                                            control: (provided) => ({
                                                ...provided,
                                                border: 'none',
                                                fontFamily: "Lato", fontWeight: 500,
                                                width: "100%",
                                                padding: "10px",
                                                background: "#fff",
                                                color: filters.location ? "#000" : "#898484"
                                            })
                                        }}
                                    />
                                </div>
                                {(filters.course.length || filters.name || filters.university || filters.location || coursename) && (
                                    <button style={{ fontFamily: "Lato", fontWeight: 500 }} className="button-content-2 px-4 search_btn ml-3" onClick={resetFilters}>
                                        Reset
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                    {activeTab === "applied" && (
                        <div className="card mb-4 welcome-card" style={{ backgroundColor: '#FFF0F0', border: 'none' }}>
                            <div className="card-header" style={{ fontFamily: "Lato", fontWeight: 700 }}>Welcome to Edulley!</div>
                            <div className="card-body">
                                <p className="card-text mb-3" style={{ color: highlightColor, fontFamily: "Lato", fontWeight: 500 }}>
                                    You are just a few steps away from submitting your application
                                </p>
                                <div className="d-flex flex-column flex-md-row justify-content-between">
                                    <span className="mb-2 mb-md-0" style={{ fontFamily: "Lato", fontWeight: 500 }}>
                                    Name : {studentDetails?.fullName || JSON.parse(localStorage.getItem('_u'))?.fullName || '--'}
                                    </span>
                                    <span className="mb-2 mb-md-0" style={{ fontFamily: "Lato", fontWeight: 500 }}>
                                        Email : {studentDetails?.email || JSON.parse(localStorage.getItem('_u'))?.email || '--'}
                                    </span>
                                    <span style={{ fontFamily: "Lato", fontWeight: 500 }}>
                                        Phone : {studentDetails?.contactNumber || JSON.parse(localStorage.getItem('_u'))?.mobileNumber || '--'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="container py-4 course_container">
                <div className="row align-items-center">
                    <div className="col-auto">
                        <img style={{ height: "2rem", width: "2rem", objectFit: "cover" }} src={university_icon} className="img-fluid" alt="" />
                    </div>
                    <div className="col-auto mb-4">
                        <h1 className="font-lato fw-bold mt-4">
                            <span className="font-lato bold page-heading-title" style={{ fontWeight: '900' }}>{activeTab === 'apply' ? 'Courses' : 'Applications'}</span>
                        </h1>
                    </div>
                </div>

                <div className="inner_course mt-0">
                    <div className="row">
                        <div className="col-md-9">
                            {activeTab === 'apply' ? (
                                <div className="row">
                                    {getCurrentItems().map((item, index) => (
                                        <div className="col-md-12" key={index}>
                                            <CourseListCard 
                                                course={item} 
                                                universitiesProp={universities}
                                                onCourseAdded={handleCourseAdded}
                                            />
                                        </div>
                                    ))}
                                    {!getCurrentItems().length && (
                                        <p className="text-center">No Courses found</p>
                                    )}
                                    <div className="d-flex justify-content-center mt-4">
                                        <Pagination 
                                            count={Math.ceil(filteredCourses.length / itemsPerPage)} 
                                            page={applyPage} 
                                            onChange={handleApplyChangePage}
                                            color="primary"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="row">
                                    {getCurrentItems().map((item, index) => (
                                        <div className="col-md-12" key={index}>
                                            <AppliedCourseListCard 
                                                course={item} 
                                                application={item} 
                                                refetchData={fetchApplications} 
                                                universitiesProp={universities}
                                            />
                                        </div>
                                    ))}
                                    {!getCurrentItems().length && (
                                        <p className="text-center">No Applications found</p>
                                    )}
                                    <div className="d-flex justify-content-center mt-4">
                                        <Pagination 
                                            count={Math.ceil(filteredApplications.length / itemsPerPage)} 
                                            page={appliedPage} 
                                            onChange={handleAppliedChangePage}
                                            color="primary"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-md-3">
                            <div className="right_scholar">
                                <div className="s_img_card">
                                    <img src={scholar1} alt="" />
                                    <p className="mt-2" style={{ fontFamily: "Lato", fontWeight: 500 }}>Confused about our Career path?</p>
                                    <button onClick={() => navigate('/career-path')} className="explore-button py-2 fw-light mt-2" style={{ fontFamily: "Lato", fontWeight: 500 }}>
                                        Explore Career path finder
                                    </button>
                                </div>
                                <div className="s_img_card">
                                    <img src={scholar2} alt="" />
                                    <p className="mt-2" style={{ fontFamily: "Lato", fontWeight: 700 }}>Let's look at the scholarships available for you</p>
                                    <button onClick={() => navigate('/scholarship')} className="explore-button py-2 fw-light mt-2" style={{ fontFamily: "Lato", fontWeight: 500 }}>
                                        Explore All Scholarship
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Academic;