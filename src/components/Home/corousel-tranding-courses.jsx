import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';

const SkeletonCard = () => (
    <div className="px-2">
      <div style={{ 
          height: '300px', 
          position: 'relative',
          margin: '0 5px',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
        <div className="shine-effect"></div>
        <div style={{ 
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100px',
          backgroundColor: '#e0e0e0',
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px',
          padding: '10px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '16px',
            width: '75%',
            backgroundColor: '#d0d0d0',
            marginBottom: '8px',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div className="shine-effect"></div>
          </div>
          <div style={{
            height: '12px',
            width: '50%',
            backgroundColor: '#d0d0d0',
            marginBottom: '16px',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div className="shine-effect"></div>
          </div>
          <div style={{
            height: '32px',
            width: '96px',
            backgroundColor: '#d0d0d0',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div className="shine-effect"></div>
          </div>
        </div>
      </div>
    </div>
  );

const TrendingCoursesCarousel = ({ trendingCourses }) => {
    const navigate = useNavigate();

    const handleCardClick = (course) => {
        const slug = course.courseName.toLowerCase().replace(/\s+/g, '-');
        navigate(`/course-details/${slug}`, { state: course });
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="trending-courses-carousel mb-5">
            <Slider {...settings}>
                {trendingCourses.length === 0 ? (
                    Array(4).fill().map((_, index) => (
                        <SkeletonCard key={`skeleton-${index}`} />
                    ))
                ) : (
                    trendingCourses.map((course, index) => (
                        <div key={index} className="px-2">
                            <div className="course-card" onClick={() => handleCardClick(course)} style={{ height: '300px', position: 'relative', cursor: 'pointer', margin: '0 5px' }}>
                                <img 
                                    src={course.bannerImage || 'https://via.placeholder.com/300'} 
                                    alt={course.courseName} 
                                    className="course-card-image" 
                                    style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '8px' }} 
                                />
                                <div className="course-card-content" style={{ 
                                    position: 'absolute', 
                                    bottom: '0', 
                                    left: '0', 
                                    right: '0', 
                                    color: '#fff', 
                                    backgroundColor: 'rgba(0,0,0,0.7)', 
                                    padding: '10px', 
                                    borderBottomLeftRadius: '8px', 
                                    borderBottomRightRadius: '8px',
                                    height: '100px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}>
                                    <div>
                                        <h3 style={{fontFamily:"Lato", fontWeight: 500, margin: '0 0 5px 0', fontSize: '16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{course.courseName}</h3>
                                        <p style={{fontFamily:"Lato", fontWeight: 500, margin: '0', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{course.universityName}</p>
                                    </div>
                                    <button 
                                        className="view-details-button" 
                                        style={{ 
                                            backgroundColor: '#FF5573', 
                                            border: 'none', 
                                            padding: '5px 10px', 
                                            borderRadius: '5px',
                                            fontFamily:"Lato", 
                                            fontWeight: 500,
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                            alignSelf: 'flex-start',
                                            color: '#fff'
                                        }}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </Slider>
        </div>
    );
};

export default TrendingCoursesCarousel;