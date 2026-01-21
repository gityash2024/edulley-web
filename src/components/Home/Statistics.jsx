import React from "react";
import styled from 'styled-components';
import statis from "../../assets/statistics.svg";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 0px;

    @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    order: 2;
    width: 100%;
  }
`;

const Title = styled.h2`
  color: #FF5573;
  font-family: "Lato", sans-serif;
// font-weight: 700;
  text-align: left;
  font-size: 32px !important;
  // font-weight: 600 !important;
  margin-top: 40px;

  @media (min-width: 768px) {
   display: none;
  }
`;
const TitleWeb = styled.h2`
  color: #FF5573;
  font-family: "Lato", sans-serif;
// font-weight: 700;
  text-align: left;
  // font-weight: 600 !important;

  margin-bottom: 20px;
    font-size: 32px !important;

  @media (max-width: 768px) {
   display: none;
  }
`;

const Description = styled.p`
font-family: "Lato", sans-serif;
font-weight: 500 !important;
  font-size: 18px;
`;

const ImageContainer = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    order: 1;
    width: 100%;
    margin-bottom: 20px;
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

const Statistics = () => {
  return (
    <Container>
      <TopSection>
          <Title>Our Statistics</Title>
        <ContentWrapper>
        <TitleWeb>Our Statistics</TitleWeb>

          <Description>
            Our numbers speak volumes about our long-standing commitment to assisting students in their study abroad transition. With years of experience, we've helped 
            countless students achieve their dreams of international education.
          </Description>
        </ContentWrapper>
        <ImageContainer>
          <Image src={statis} alt="Our Statistics" />
        </ImageContainer>
      </TopSection>
    </Container>
  );
};

export default Statistics;