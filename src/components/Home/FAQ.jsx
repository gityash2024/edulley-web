import React, { useState } from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'lucide-react';
import faqImg from "../../assets/30576701-7718875-1.svg";
import { useLocation } from 'react-router-dom';
import SEO from '../SEO';

const FAQContainer = styled.div`
  background: rgb(255, 250, 250);
  padding: 3rem 0;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const Title = styled.h2`
  fontFamily: "Lato", fontWeight: 700, sans-serif;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-family: "Lato", sans-serif;
font-weight: 500 !important;
  font-size: 1rem;
  margin-bottom: 2rem;
`;

const FAQWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AccordionWrapper = styled.div`
  width: 60%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const AccordionItem = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const AccordionHeader = styled.div`
  background: #f5f5f5;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const AccordionTitle = styled.h3`
  font-family: "Lato", sans-serif;
font-weight: 500 !important;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;

const AccordionContent = styled.div`
  padding: 1rem;
  background: white;
`;

const FAQImage = styled.img`
  width: 35%;
  max-width: 300px;
  height: auto;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 2rem;
  }
`;

const StyledChevronDown = styled(ChevronDown)`
  transition: transform 0.3s ease;
  transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const FAQ = () => {
  const location=useLocation();
  console.log(location,'location from faq')
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const faqData = [
    {
      question: "Do I have to pay anything to apply with Edulley?",
      answer: "No, you don't have to pay any amount to anyone to process your application with us. However, if an institution has any application fee that might be payable at the time of application submission."
    },
    {
      question: "How do I apply?",
      answer: "You can sign up, shortlist courses and submit your application to the favorite institution. We would be in between to check your application and to make sure you do it correctly."
    },
    {
      question: "How many applications I can submit at max?",
      answer: "You can submit up to 5 applications to different institutions. You can choose universities based on the order of your chances to get through."
    },
    {
      question: "Will Edulley help in preparing for the Visa Interview as well?",
      answer: "Yes, we would provide complete assistance during your visa process and prepare you for any visa interview all at no additional cost."
    },
    {
      question: "Will Edulley write my statement of purpose (SOP)?",
      answer: "We encourage the applicants to write their own statement; however, if you think you cannot do it yourself, you can seek advice from your dedicated expert on your profile."
    }
  ];

  return (
    <FAQContainer >
      {location.pathname==='/faq' ? <SEO 
  title="Study Abroad FAQs: Frequently Asked Questions Answered"
  description="Find answers to frequently asked questions about studying abroad. Our comprehensive FAQs cover everything you need to know for a smooth international education journey."
  canonicalUrl="https://edulley.com/faq"
  keywords="study abroad FAQs, international education questions, study abroad help, education abroad questions"
  ogType="website"
  ogImage="https://edulley.com/images/faq-og.jpg"
  schema={{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the benefits of studying abroad?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Studying abroad offers numerous benefits including exposure to different cultures, languages, educational systems, networking opportunities, and enhanced career prospects."
        }
      },
      {
        "@type": "Question",
        "name": "How can I find scholarships for studying abroad?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can find scholarships through Edulley's scholarship search tool, university websites, government programs, and private organizations that support international education."
        }
      }
    ]
  }}
/>:null}
      <ContentWrapper style={{marginTop:"20px"}}>
        <Title>Frequently Asked Questions</Title>
        <Description>
          Confused about something? Here is a quick list of FAQs to help you get started. If you still need further assistance, try getting in touch with our team and we would love to assist you.
        </Description>
        <FAQWrapper>
          <AccordionWrapper>
            {faqData.map((item, index) => (
              <AccordionItem key={index}>
                <AccordionHeader onClick={() => toggleAccordion(index)}>
                  <AccordionTitle>{item.question}</AccordionTitle>
                  <StyledChevronDown $isOpen={openAccordion === index} size={24} />
                </AccordionHeader>
                {openAccordion === index && (
                  <AccordionContent>
                    <p>{item.answer}</p>
                  </AccordionContent>
                )}
              </AccordionItem>
            ))}
          </AccordionWrapper>
          <FAQImage src={faqImg} alt="FAQ Illustration" loading="lazy" />
        </FAQWrapper>
      </ContentWrapper>
    </FAQContainer>
  );
};

export default FAQ;