import React from "react";
import SEO from "../components/SEO";

const TermsConditions = () => {
  return (
    <div className="container py-5" >
  <SEO 
  title="Terms and Conditions || Edulley"
  description="Explore Edulley's terms and conditions to ensure a clear understanding of your rights and obligations. Stay informed for a better user experience."
  canonicalUrl="https://edulley.com/terms-and-condition"
  keywords="terms and conditions, user agreement, service terms, legal terms, user rights"
  ogType="website"
  schema={{
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms and Conditions",
    "description": "Edulley's terms of service and user agreement",
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
        <h1 style={{ color: "#ff5573", fontWeight: "600" }}>Terms and Conditions</h1>
      </header>
      <main style={{ fontFamily: "Lato", fontWeight: 500 ,padding:"10px"}}>
        <section>
          <p style={{ fontFamily: "Lato", fontWeight: 700, marginTop: "4px" }}>Last updated: June 14, 2024</p>
          <ul>
            <li>When you sign up with Edulley and its services, you declare that the information and supporting documentation provided is true and complete and you give the rights to Edulley to handle the communication and information on your behalf with the institutions.</li>
            <li>You have read and understood the description, duration, and structure of the course/s that you are applying to on the University/ies website.</li>
            <li>You declare that any academic results submitted are a complete record of all results that you have obtained from every secondary or post-secondary institution you have attended and acknowledge that failure to disclose academic records or obscuring information may result in not getting admitted to any school.</li>
            <li>You authorise the University to seek verification of your academic and professional qualifications, work experience, and other documentation provided to support your application. You understand that the University reserves the right to inform other tertiary institutions and agencies if any of the material presented to support your application is found to be false.</li>
            <li>You have understood that the University reserves the right to not issue an offer or revoke an existing offer if it is unable to verify the authenticity of documentation provided to support your application, or if the material contained in the application is found to have been copied from other sources and is not your own work.</li>
            <li>You acknowledge that the University reserves the right at any stage to vary or reverse any decision regarding admission or enrolment made based on incorrect, incomplete, or fraudulent information.</li>
            <li>You confirm that Edulley is not responsible for your experience at the university and that you need to be well-informed about the institutions you wish to study at before starting an application.</li>
            <li>You authorise Edulley to obtain further relevant documentation to support your application, if necessary, and the University reserves the right to alter any course, subject, admission requirement or fee without notice.</li>
            <li>You declare that you are a Genuine Student and that your immediate intention is nothing other than studying and that you must abide by all terms and conditions of your visa and co-operate with the designated team to provide any information requested on time.</li>
            <li>You are aware of the tuition, travel, and living costs for your stay in the country you aspire to study and that it is your responsibility to meet such costs for the duration of the program.</li>
            <li>You understand that there can be a service fee for additional services such as employment guide, CV formatting, meet & greet, and others.</li>
            <li>You are aware that Edulley doesn't guarantee admission to the university of your choice or the Visa. The university and the embassy hold the right to admission and Visa decisions respectively.</li>
            <li>You acknowledge that any review or testimonial you provide can be openly shared on Edulley's social handles and can be used in promotional activities.</li>
            <li>You agree to receive promotional emails, SMS, and promotional content from Edulley.</li>
            <li>You agree that there can sometimes be a third-party agent involved in your application for some of the universities not directly represented by Edulley.</li>
            <li>I understand that in case of a Visa refusal, the University will refund the tuition fee as per their own refund policies and within their turnaround time normally ranging from 6-8 weeks.</li>
          </ul>
        </section>
        <footer style={{ fontFamily: "Lato", fontWeight: 700, marginTop: "20px" }}>
          <p>Please note that these terms and conditions are subject to change, and we recommend checking our website regularly for any updates to stay informed about your responsibilities and rights.</p>
        </footer>
      </main>
    </div>
  );
};

export default TermsConditions;
