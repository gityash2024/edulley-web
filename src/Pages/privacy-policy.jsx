import React from "react";
import SEO from "../components/SEO";

const PrivacyPolicy = () => {
  return (
    <div className="container py-5">
      <SEO
  title="Our Privacy Policy || Edulley"
  description="Learn about Edulley's commitment to your privacy. Our policy outlines data protection measures and your rights regarding personal information."
  canonicalUrl="https://edulley.com/privacy-policy"
  keywords="privacy policy, data protection, personal information, user rights, privacy terms"
  ogType="website"
  schema={{
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy",
    "description": "Edulley's commitment to your privacy and data protection",
    "publisher": {
      "@type": "Organization",
      "name": "Edulley",
      "logo": {
        "@type": "ImageObject",
        "url": "https://edulley.com/logo.png"
      }
    }
  }}
/>
            <div className="py-5"></div>

      <header style={{ fontFamily: "Lato", fontWeight: 700 }}>
        <h1 style={{ color: "#ff5573", fontWeight: "600" }}>Privacy Policy</h1>
      </header>
      <main style={{ fontFamily: "Lato", fontWeight: 500,padding:"10px"}}>
        <section>
          <p style={{ fontFamily: "Lato", fontWeight: 700 ,marginTop:"4px"}}>Last updated: June 14, 2024</p>
          <p style={{ fontFamily: "Lato", fontWeight: 700 ,marginTop:"4px"}}>Welcome to Edulley. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you visit our website, use our services, or interact with us.</p>
        </section>
        <section>
          <h4 style={{ fontFamily: "Lato", fontWeight: 700 ,marginTop:"10px"}}>Information We Collect</h4>
          <ul>
            <li>Personal Information: Name, email address, phone number, date of birth, passport details, educational background, and any other information you provide.</li>
            <li>Usage Data: Information about how you interact with our website, such as IP address, browser type, pages visited, and the time spent on those pages.</li>
            <li>Cookies: Small data files stored on your device to enhance your experience on our website.</li>
          </ul>
        </section>
        <section>
          <h4 style={{ fontFamily: "Lato", fontWeight: 700 ,marginTop:"10px"}}>How We Use Your Information</h4>
          <p>Service Provision: To provide you with study abroad consulting services and process your applications.</p>
          <p>Communication: To send updates, newsletters, and promotional materials (you can opt out at any time).</p>
          <p>Improvement: To improve our website and services based on user feedback and usage data.</p>
          <p>Legal Compliance: To comply with legal obligations and protect our legal rights.</p>
        </section>
        <section>
          <h4 style={{ fontFamily: "Lato", fontWeight: 700 ,marginTop:"10px"}}>Information Sharing and Disclosure</h4>
          <p>Third-Party Service Providers: We may share your information with third parties who perform services on our behalf, such as educational institutions, visa processing agencies, and payment processors.</p>
          <p>Legal Requirements: We may disclose your information if required by law or to protect our rights and safety.</p>
        </section>
        <section>
          <h4 style={{ fontFamily: "Lato", fontWeight: 700 ,marginTop:"10px"}}>Data Security</h4>
          <p>We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
        </section>
        <section>
          <h4 style={{ fontFamily: "Lato", fontWeight: 700 ,marginTop:"10px"}}>Your Rights</h4>
          <p>Access: You can request access to your personal information.</p>
          <p>Correction: You can request correction of inaccurate or incomplete information.</p>
          <p>Deletion: You can request the deletion of your personal information.</p>
          <p>Objection: You can object to the processing of your personal information.</p>
        </section>
        <section>
          <h4 style={{ fontFamily: "Lato", fontWeight: 700 ,marginTop:"10px"}}>Cookies Policy</h4>
          <p>We use cookies to enhance your experience on our website. You can manage your cookie preferences through your browser settings.</p>
        </section>
        <section>
          <h4 style={{ fontFamily: "Lato", fontWeight: 700 ,marginTop:"10px"}}>Changes to This Privacy Policy</h4>
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
        </section>
        <footer style={{ fontFamily: "Lato", fontWeight: 700, marginTop: "20px" }}>
  <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
  <p>Edulley</p>
  <p style={{ cursor: "pointer" }} onClick={() => window.location.href = "mailto:info@edulley.com"}>Email: info@edulley.com</p>
  <p style={{ cursor: "pointer" }} onClick={() => window.location.href = "tel:+918610800974"}>Phone: +91-8610800974</p>
</footer>

      </main>
    </div>
  );
};

export default PrivacyPolicy;
