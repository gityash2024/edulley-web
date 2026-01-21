import React from "react";
import Search from "../components/Home/Search";
import SEO from "../components/SEO";

const Courses = () => {
  return (
    <div className="min_height">
 <SEO 
  title="Certification, Skill Development & Professional Courses | Edulley"
  description="Discover Edulley's diverse selection of certification and skill development courses. Elevate your professional journey and achieve success with us."
  canonicalUrl="https://edulley.com/courses"
  ogUrl="https://edulley.com/courses"
  keywords="certification courses, skill development, professional courses, online learning, career advancement"
  ogImage="https://edulley.com/images/courses-og.jpg"
  schema={{
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Course",
        "position": 1,
        "url": "https://edulley.com/courses",
        "name": "Certification Courses",
        "description": "Professional certification courses to advance your career"
      },
      {
        "@type": "Course",
        "position": 2,
        "url": "https://edulley.com/courses",
        "name": "Skill Development Programs",
        "description": "Specialized programs to enhance your skills and capabilities"
      }
    ]
  }}
/>
      <Search />
    </div>
  );
};

export default Courses;