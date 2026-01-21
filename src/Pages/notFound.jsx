import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { ErrorOutline } from '@mui/icons-material';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
  text-align: center;
`;

const IconWrapper = styled.div`
  font-size: 200px;
  color: #ff5573;
  margin-bottom: 2rem;
  animation: ${fadeIn} 1s ease-in;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 1rem;
  animation: ${fadeIn} 1s ease-in 0.5s both;
`;

const Message = styled.p`
  font-size: 1.25rem;
  color: #34495e;
  margin-bottom: 2rem;
  max-width: 600px;
  animation: ${fadeIn} 1s ease-in 1s both;
`;

const Slogan = styled.p`
  font-size: 1.1rem;
  font-style: italic;
  color: #7f8c8d;
  margin-bottom: 2rem;
  animation: ${fadeIn} 1s ease-in 1.5s both;
`;

const HomeButton = styled(Link)`
  background-color: #ff5573;
  color: white;
  font-weight: bold;
  padding: 12px 24px;
  border-radius: 30px;
  text-decoration: none;
  transition: all 0.3s ease;
  animation: ${fadeIn} 1s ease-in 2s both;

  &:hover {
    background-color: #ff3c5d;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const NotFound = () => {
  return (
    <Container>
      <IconWrapper>
        <ErrorOutline style={{ fontSize: 'inherit' }} />
      </IconWrapper>
      <Title>Oops! Page Not Found</Title>
      <Message>
        The page you're looking for seems to have wandered off. It might be
        exploring new horizons or taking a well-deserved break.
      </Message>
      <Slogan>
        "Not all those who wander are lost, but this page definitely is!"
      </Slogan>
      <HomeButton to="/">
        Return to Familiar Territory
      </HomeButton>
    </Container>
  );
};

export default NotFound;