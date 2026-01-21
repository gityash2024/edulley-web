import React from "react";
import Universties from "../components/Home/Universties";
import SEO from "../components/SEO";

const UniversitesPage = () => {
  return (
    <div>
  <SEO 
  title="Top International Universities for Students | Foreign Institutions"
  description="Discover top universities for international students at Edulley. Explore foreign institutions that offer quality education and diverse cultural experiences."
  canonicalUrl="https://edulley.com/institutions"
  keywords="international universities, foreign institutions, study abroad universities, top global colleges"
  ogType="website"
  ogImage="https://edulley.com/images/institutions-og.jpg"
  schema={{
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Top International Universities and Institutions",
    "description": "A comprehensive list of top universities and institutions for international students",
    "itemListElement": [
      {
        "@type": "CollegeOrUniversity",
        "position": 1,
        "name": "International Universities",
        "description": "Top-ranked universities available for international students"
      },
      {
        "@type": "CollegeOrUniversity",
        "position": 2,
        "name": "Foreign Institutions",
        "description": "Quality educational institutions offering programs for international students"
      }
    ]
  }}
/>
      <Universties />
    </div>
  );
};

export default UniversitesPage;
