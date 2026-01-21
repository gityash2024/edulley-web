import React, { useEffect, useState } from "react";
import CourseListCard from "../components/CourseListCard";
import { useNavigate, useLocation } from "react-router-dom";
import { Range } from 'react-range';
import { toast } from "react-hot-toast";
import CustomLoader from "../components/loader";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { getCourses, getUniversities } from "../Services/dashboard";
import cherons from "../assets/chevrons-right.png";

const CourseList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const coursesPerPage = 5;
    const [sortOption, setSortOption] = useState('');
    const [tuitionFee, setTuitionFee] = useState([0, 50000]);
    const [compareCourse, setCompareCourse] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchParams, setSearchParams] = useState({});
    const [activeFilters, setActiveFilters] = useState({
        universities: new Set(),
        programLevels: new Set(),
        disciplineAreas: new Set(),
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [courseResponse, universityResponse] = await Promise.all([getCourses(), getUniversities()]);
            let validCourses = courseResponse.data?.data || [];
            
            if (location.state) {
                setIsFilterApplied(location.state.isFilterApplied);
                setSearchParams(location.state.searchParams || {});

                if (location.state.filteredCourses && location.state.filteredCourses.length > 0) {
                    validCourses = validCourses.filter(course => location.state.filteredCourses.includes(course._id));
                }
            }

            setCourses(validCourses);
            setUniversities(universityResponse.data?.data || []);
            setFilteredCourses(validCourses);
            setLoading(false);
        } catch (error) {
            toast.error('Something went wrong');
            setLoading(false);
        }
    };


    const handleCourseAdded=()=>{
        fetchData();
    }

    useEffect(() => {
        if (isFilterApplied) {
            let result = courses;

            // Apply filters based on searchParams
            if (searchParams.course) {
                result = result.filter(course => course.courseName.toLowerCase().includes(searchParams.course.toLowerCase()));
            }
            if (searchParams.intake && searchParams.intake.length) {
                result = result.filter(course => 
                    course.uniqueCourseInfo?.upcomingIntakes?.some(intake => 
                        searchParams.intake.map(i => i.toLowerCase()).includes(intake.toLowerCase())
                    )
                );
            }
            if (searchParams.year) {
                result = result.filter(course => course.uniqueCourseInfo?.years === searchParams.year);
            }
            if (searchParams.country) {
                result = result.filter(course => universities.find(uni => uni.universityName === course.universityName)?.country === searchParams.country);
            }
            if (searchParams.disciplineArea) {
                result = result.filter(course => course.disciplineArea === searchParams.disciplineArea);
            }
            if (searchParams.programLevel && searchParams.programLevel.length) {
                result = result.filter(course => searchParams.programLevel.includes(course.level.toLowerCase()));
            }
            if (searchParams.duration) {
                result = result.filter(course => course.uniqueCourseInfo?.duration === searchParams.duration);
            }
            if (searchParams.requirements && searchParams.requirements.length) {
                result = result.filter(course => searchParams.requirements.every(req => course.requirements.includes(req)));
            }
            console.log("Received searchParams:", searchParams);

            setFilteredCourses(result);
        } else {
            setFilteredCourses(courses);
        }
    }, [isFilterApplied, searchParams, courses, universities]);

    const resetFilters = () => {
        setActiveFilters({
            universities: new Set(),
            programLevels: new Set(),
            disciplineAreas: new Set(),
        });
        setTuitionFee([0, 50000]);
        setSortOption('');
        setIsFilterApplied(false);
        setSearchParams({});
        setFilteredCourses(courses);
    };

    const handleFilterChange = (filterType, value, isChecked) => {
        setActiveFilters(prev => {
            const newFilters = { ...prev };
            if (isChecked) {
                newFilters[filterType].add(value);
            } else {
                newFilters[filterType].delete(value);
            }
            return newFilters;
        });
    };

    useEffect(() => {
        let result = courses;

        if (activeFilters.universities.size > 0) {
            result = result.filter(course => activeFilters.universities.has(course.universityName));
        }

        if (activeFilters.programLevels.size > 0) {
            result = result.filter(course => activeFilters.programLevels.has(course.level));
        }

        if (activeFilters.disciplineAreas.size > 0) {
            result = result.filter(course => activeFilters.disciplineAreas.has(course.disciplineArea));
        }

        result = result.filter(course => 
            course.uniqueCourseInfo.fee >= tuitionFee[0] && course.uniqueCourseInfo.fee <= tuitionFee[1]
        );

        if (sortOption === 'FeeHighToLow') {
            result.sort((a, b) => b.uniqueCourseInfo.fee - a.uniqueCourseInfo.fee);
        } else if (sortOption === 'FeeLowToHigh') {
            result.sort((a, b) => a.uniqueCourseInfo.fee - b.uniqueCourseInfo.fee);
        }

        setFilteredCourses(result);
        setIsFilterApplied(true);
    }, [activeFilters, tuitionFee, sortOption, courses]);

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const toggleCourseSelection = (courseId) => {
        setCompareCourse(prev => {
            if (prev.includes(courseId)) {
                return prev.filter(id => id !== courseId);
            } else if (prev.length < 5) {
                return [...prev, courseId];
            } else {
                toast.error('You can only compare up to 5 courses.');
                return prev;
            }
        });
    };

    const handleCompareClick = () => {
        if (compareCourse.length < 5) {
            toast.error('Please select 5 courses to compare.');
        } else {
            console.log('Selected courses for comparison:', compareCourse);
            navigate('/compare', { state: compareCourse });
        }
    };

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const indexOfLastCourse = page * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

    return (
        <div className="container py-5 course_container">
            <div className="py-4"></div>
            {loading && 'Loading...'}
            <div className="row mb-4">
                <div className="col-md-9 d-flex align-items-center">
                    <p style={{ fontFamily: 'Lato', fontWeight: 500 }}>
                        {isFilterApplied ? `${filteredCourses.length} Courses Found` : `${courses.length} Courses Found`}
                    </p>
                </div>
                <div className="col-md-3 d-flex justify-content-end align-items-center">
                    <span style={{ fontFamily: 'Lato', fontWeight: 500, marginRight: '10px', width: "80px" }}>Sort by</span>
                    <select
                        className="form-select"
                        style={{ fontFamily: 'Lato', fontWeight: 500 }}
                        value={sortOption}
                        onChange={handleSortChange}
                    >
                        <option value="">Select</option>
                        <option value="FeeHighToLow">Fee Amount (High to Low)</option>
                        <option value="FeeLowToHigh">Fee Amount (Low to High)</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 d-flex justify-content-end align-items-center">
                    <button className="explore-button mb-3" style={{ fontFamily: 'Lato', fontWeight: 500 }} onClick={handleCompareClick}>
                        Compare <img src={cherons} alt="Compare" />
                    </button>
                </div>
            </div>
            <div>
                <div className="row">
                    <div className="col-md-7">
                        <div className="left_list">
                            {filteredCourses.length > 0 ? (
                                currentCourses.map((course) => (
                                    <CourseListCard 
                                        key={course._id} 
                                        course={course} 
                                        onToggleSelection={toggleCourseSelection} 
                                        isSelected={compareCourse.includes(course._id)} 
                                        onCourseAdded={handleCourseAdded}
                                    />
                                ))
                            ) : (
                                <div className="d-flex justify-content-center align-items-center" style={{height: '300px'}}>
                                    <h3 style={{fontFamily: 'Lato', fontWeight: 500, color: '#FF5573'}}>No Course Found</h3>
                                </div>
                            )}
                        </div>
                        {filteredCourses.length > 0 && (
                            <Stack spacing={2}>
                                <Pagination 
                                    count={Math.ceil(filteredCourses.length / coursesPerPage)} 
                                    page={page} 
                                    onChange={handleChangePage} 
                                />
                            </Stack>
                        )}
                    </div>
                    <div className="col-md-5">
                        <span style={{fontFamily:"Lato", fontWeight: 700, fontSize:"22px"}}>Filters</span>
                        <div className="right_list">
                            <h5 className="mb-2" style={{fontFamily:"Lato", fontWeight: 500,color:"#FF5573"}}>Universities</h5>
                            {Array.from(new Set(courses.map(course => course.universityName))).map((university, index) => (
                                <div className="form-check mb-3" key={index}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`university-${index}`}
                                        checked={activeFilters.universities.has(university)}
                                        onChange={(e) => handleFilterChange('universities', university, e.target.checked)}
                                    />
                                    <label className="form-check-label" style={{fontFamily:"Lato", fontWeight: 500}} htmlFor={`university-${index}`}>
                                        {university || '--'}
                                    </label>
                                </div>
                            ))}
                            <h5 style={{fontFamily:"Lato", fontWeight: 500,color:"#FF5573"}} className="mb-5">Tuition Fee</h5>
                            <Range
                                values={tuitionFee}
                                step={1000}
                                min={0}
                                max={50000}
                                onChange={(values) => setTuitionFee(values)}
                                renderTrack={({ props, children }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            height: '6px',
                                            width: '100%',
                                            backgroundColor: '#ccc'
                                        }}
                                    >
                                        {children}
                                    </div>
                                )}
                                renderThumb={({ props, index }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            height: '20px',
                                            width: '20px',
                                            backgroundColor: '#999'
                                        }}
                                    >
                                        <div style={{
                                            position: 'absolute',
                                            top: '-28px',
                                            color: '#fff',
                                            fontWeight: 'bold',
                                            fontSize: '14px',
                                            fontFamily: 'Arial',
                                            padding: '4px',
                                            borderRadius: '4px',
                                            backgroundColor: '#548BF4'
                                        }}>
                                            {tuitionFee[index]}
                                        </div>
                                    </div>
                                )}
                            />
                            <div>
                                <p className="mt-3 mb-3">Min: ${tuitionFee[0]} - Max: ${tuitionFee[1]}</p>
                            </div>
                            <h5 style={{fontFamily:"Lato", fontWeight: 500,color:"#FF5573"}} className="mb-2">Program Level</h5>
                            {Array.from(new Set(courses.map(course => course.level))).map((level, index) => (
                                <div className="form-check mb-3" key={index}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`level-${index}`}
                                        checked={activeFilters.programLevels.has(level)}
                                        onChange={(e) => handleFilterChange('programLevels', level, e.target.checked)}
                                    />
                                    <label className="form-check-label" style={{fontFamily:"Lato", fontWeight: 500}} htmlFor={`level-${index}`}>
                                        {level || '--'}
                                    </label>
                                </div>
                            ))}
                            <h5 style={{fontFamily:"Lato", fontWeight: 500,color:"#FF5573"}} className="mb-2">Discipline Area</h5>
                            {Array.from(new Set(courses.map(course => course.disciplineArea))).map((area, index) => (
                                <div className="form-check mb-3" key={index}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`discipline-${index}`}
                                        checked={activeFilters.disciplineAreas.has(area)}
                                        onChange={(e) => handleFilterChange('disciplineAreas', area, e.target.checked)}
                                    />
                                    <label className="form-check-label" style={{fontFamily:"Lato", fontWeight: 500}} htmlFor={`discipline-${index}`}>
                                        {area || '--'}
                                    </label>
                                </div>
                            ))}
                            <button className="btn btn-primary mt-3" style={{fontFamily:"Lato", fontWeight: 500}} onClick={resetFilters}>Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseList;