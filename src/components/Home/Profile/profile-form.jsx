import React, { useState } from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import Profile from './profile';
import Academic from './application';
import ViewUserDocument from './document';

const ProfileForm = () => {
  const [activeKey, setActiveKey] = useState('profile');

  const handleSelect = (key) => {
    setActiveKey(key);
  };

  
  return (
    <div className="home-page-container profile-tab container-fluid" style={{ paddingTop: "6rem" }}>
      <div className="container">
        <Tab.Container id="profile-tabs" activeKey={activeKey} onSelect={handleSelect}>
          <Row>
            <Col>
              <Nav variant="pills" className="flex-row">
                <Nav.Item>
                  <Nav.Link 
                    eventKey="profile" 
                    className={`tab-link ${activeKey === 'profile' ? 'active-tab' : ''}`} 
                    style={{ fontFamily: 'Lato', fontWeight: 500 }}
                  >
                    Profile
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    eventKey="applications" 
                    className={`tab-link ${activeKey === 'applications' ? 'active-tab' : ''}`} 
                    style={{ fontFamily: 'Lato', fontWeight: 500 }}
                  >
                    Applications
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    eventKey="documents" 
                    className={`tab-link ${activeKey === 'documents' ? 'active-tab' : ''}`} 
                    style={{ fontFamily: 'Lato', fontWeight: 500 }}
                  >
                    Documents
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
          <Row>
            <Col>
              <Tab.Content>
                <Tab.Pane eventKey="profile">
                  <Profile updateState={setActiveKey} />
                </Tab.Pane>
                <Tab.Pane eventKey="applications">
                  <Academic />
                </Tab.Pane>
                <Tab.Pane eventKey="documents">
                  <ViewUserDocument />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
};

export default ProfileForm;
