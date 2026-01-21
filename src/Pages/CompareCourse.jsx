import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCourses, getScholarship, getUniversities } from '../Services/dashboard';
import toast from 'react-hot-toast';
import course_icon from '../assets/course.png';
import CustomLoader from '../components/loader';

const CompareCourse = () => {
  const location = useLocation();
  const courseIds = location?.state || [];
  const [courses, setCourses] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(false);

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
  };

  const fetchScholarships = async () => {
    try {
      const response = await getScholarship();
      setScholarships(response.data.data);
    } catch (error) {
      toast.error('Failed to load scholarships data.');
    }
  };

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await getCourses();
      const allCourses = response.data.data || [];
      const filteredCourses = allCourses.filter(course => courseIds.includes(course._id));
      setCourses(filteredCourses);
      setLoading(false);
    } catch (error) {
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchUniversities();
    fetchScholarships();
  }, []);

  const getUniversityLocation = (universityName) => {
    const university = universities.find(uni => uni.universityName?.trim()?.toLowerCase() === universityName?.trim()?.toLowerCase());
    return university ? `${university.city}, ${university.country}` : '--';
  };

  const getScholarshipInfo = (universityName) => {
    const universityScholarships = scholarships.filter(s => s.universityName === universityName);
    if (universityScholarships.length === 0) return '--';
    return (
      <ul style={{ margin: 0, paddingLeft: '20px' }}>
        {universityScholarships.map((s, index) => (
          <li key={index}>{s.name}: ${s.amount||0}</li>
        ))}
      </ul>
    );
  };

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <div className="comparison-table-container" style={{ padding: '20px' }}>
      <div className="row">
        <div>
          <h1 style={{ marginTop: "80px" }} className="font-lato fw-bold course-head">
            <img src={course_icon} className="img-fluid" alt="" />
            <span className="mt-1 ml-2 font-lato" style={{ fontFamily: "Lato", fontWeight: 700 }}>Courses Comparison</span>
          </h1>
        </div>
      </div>
      {loading ? <CustomLoader /> : null}

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f8f8f8" }}>
            <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #e0e0e0" }}>Criteria</th>
            {courses.map((course, index) => (
              <th key={index} style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #e0e0e0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <img src={course.courseLogo} alt="University Logo" style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
                  <span>{course.courseName || '--'}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { label: "University Name", key: "universityName" },
            { label: "Location", key: "location" },
            { label: "Program Level", key: "level" },
            { label: "Duration", key: "uniqueCourseInfo.duration" },
            { label: "Intake", key: "uniqueCourseInfo.upcomingIntakes" },
            { label: "Requirements", key: "requirements" },
            { label: "Application Fee", key: "uniqueCourseInfo.applicationFee" },
            { label: "Tuition Fee", key: "uniqueCourseInfo.fee" },
            { label: "Scholarship", key: "scholarship" }
          ].map((row, rowIndex) => (
            <tr key={rowIndex} style={{ backgroundColor: rowIndex % 2 === 0 ? "#ffffff" : "#f8f8f8" }}>
              <td style={{ padding: "10px", borderBottom: "1px solid #e0e0e0", fontWeight: "bold" }}>{row.label}</td>
              {courses.map((course, courseIndex) => (
                <td key={courseIndex} style={{ padding: "10px", borderBottom: "1px solid #e0e0e0" }}>
                  {row.key === 'location' ? getUniversityLocation(course.universityName) :
                   row.key === 'scholarship' ? getScholarshipInfo(course.universityName) :
                   row.key === 'requirements' ? (
                     <div 
                       className="rendered-html-content"
                       dangerouslySetInnerHTML={createMarkup(course[row.key] || '--')}
                     />
                   ) :
                   row.key.includes('.') 
                    ? course[row.key.split('.')[0]]?.[row.key.split('.')[1]] || '--'
                    : (row.key === 'uniqueCourseInfo.fee' ? `$ ${course[row.key.split('.')[0]]?.[row.key.split('.')[1]] || '--'}` : (course[row.key] || '--'))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompareCourse;