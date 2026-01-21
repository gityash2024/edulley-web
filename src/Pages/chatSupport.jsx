import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap';
import map from '../assets/mappin.svg';
import ellipse from '../assets/Ellipse.png';
import contactRelationshipManager from '../assets/contact-relation-ship-manager.png';
import contact from '../assets/contact.png';
import whatsapp from '../assets/logos_whatsapp-icon.png';
import linkedin from '../assets/devicon_linkedin.png';
import email from '../assets/material-symbols-light_stacked-email-sharp.png';
import { createApplicationChat, getApplicationChat } from '../Services/dashboard';

const ChatSupport = () => {
    const location = useLocation();
    const course = location.state;
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchChatMessages = async () => {
            if (course?._id) {
                try {
                    const response = await getApplicationChat({ applicationId: course._id });
                    console.log("Chat messages response:", response);
                    if (response?.data?.data && Array.isArray(response.data?.data)) {
                        setChatMessages(response.data?.data);
                    }
                } catch (error) {
                    console.error("Error fetching chat messages:", error);
                }
            }
        };

        const intervalId = setInterval(fetchChatMessages, 5000);

        // Initial fetch
        fetchChatMessages();

        // Cleanup function
        return () => clearInterval(intervalId);
    }, [course]);

    const handleSendMessage = async (event) => {
        event.preventDefault();
        if (newMessage.trim() === "") return;

        try {
            const payload = {
                applicationId: course._id,
                message: newMessage,
            };
            const response = await createApplicationChat(payload);
            console.log("Send message response:", response);

            if (response?.data) {
                setChatMessages(prevMessages => [...prevMessages, response.data]);
            }
            setNewMessage('');
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <Container className="py-4 course_container">
            <Row className="py-5 mt-4 mb-4">
                <Col md={4}>
                    <Card style={{ borderRadius: "26px", boxShadow: "0px 4px 12px 0px #0000001C" }}>
                        <Card.Body>
                            <Card.Text style={{ fontFamily: 'Lato', fontWeight: 500, color: '#000' }}>{course?.createdAt?.split('T')[0]}</Card.Text>
                            <Card.Title style={{ fontFamily: "Lato", fontWeight: 700 }}>{course.courseId.courseName}</Card.Title>
                            <Card.Subtitle style={{ fontFamily: 'Lato', fontWeight: 500, color: '#000' }}> <img src={ellipse} alt="map" style={{ width: "1rem", height: "1rem" }} /> {course.courseId.universityName}</Card.Subtitle>
                            <Card.Text style={{ fontFamily: 'Lato', fontWeight: 500, marginTop: "5px" }}>Status : <span className="badge pt-2 pb-2" style={{ backgroundColor: 'rgb(89 255 201)', color: 'rgb(4 51 30)', fontFamily: 'Lato', fontWeight: 500 }}>{course?.status === "DEPOSIT_PAID" ? "Paid" : course.status}</span></Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="mt-4" style={{ borderRadius: "26px", boxShadow: "0px 4px 12px 0px #0000001C" }}>
                        <Card.Body className="text-center">
                            <Card.Title style={{ fontFamily: "Lato", fontWeight: 700 }}>
                                <img src={contact} alt="contact" style={{ width: "1.5rem", marginRight: '5px', height: "1.5rem", color: '#FF6477' }} />
                                Contact a Relationship Manager
                            </Card.Title>
                            <Card.Img variant="top" src={contactRelationshipManager} />
                            <div className='d-flex flex-column'>
                                <Button variant="link" href="mailto:info@edulley.com" target="_blank" style={{ display: 'flex', alignItems: 'center', fontFamily: 'Lato', fontWeight: 500, color: '#000' }}>
                                    <img src={email} alt="email" style={{ width: "1.5rem", height: "1.5rem", marginRight: '5px' }} />
                                    info@edulley.com
                                </Button>
                                <Button variant="link" href="https://wa.me/message/SMDIYPHGQFQRC1" target="_blank" style={{ display: 'flex', alignItems: 'center', fontFamily: 'Lato', fontWeight: 500, color: '#000' }}>
                                    <img src={whatsapp} alt="whatsapp" style={{ width: "1.5rem", height: "1.5rem", marginRight: '5px' }} />
                                    Whatsapp Link
                                </Button>
                                <Button variant="link" href="https://www.linkedin.com/company/edulley/" target="_blank" style={{ display: 'flex', alignItems: 'center', fontFamily: 'Lato', fontWeight: 500, color: '#000' }}>
                                    <img src={linkedin} alt="linkedin" style={{ width: "1.5rem", height: "1.5rem", marginRight: '5px' }} />
                                    Linkedin Link
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    <Card className="mt-4" style={{ borderRadius: "16px", border: "1px solid #57565626" }}>
                        <Card.Body>
                            <Card.Title style={{ fontFamily: 'Lato', fontWeight: 500 }}>Chat with us</Card.Title>
                            <div className="chat-box" style={{ maxHeight: '400px', overflowY: 'auto', padding: '10px' }}>
                                {chatMessages.map((msg, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            display: 'flex',
                                            justifyContent: msg.senderRole === "USER" ? 'flex-end' : 'flex-start',
                                            marginBottom: '10px'
                                        }}
                                    >
                                        <div
                                            style={{
                                                maxWidth: '70%',
                                                padding: '10px',
                                                borderRadius: '10px',
                                                backgroundColor: msg.senderRole === "USER" ? '#FF6477' : '#F0F0F0',
                                                color: msg.senderRole === "USER" ? 'white' : 'black'
                                            }}
                                        >
                                            <p style={{ margin: 0, fontFamily: 'Lato', fontWeight: 500 }}>{msg.message}</p>
                                            <small style={{ display: 'block', textAlign: 'right', marginTop: '5px', fontFamily: 'Lato', fontWeight: 500, fontSize: '0.7rem', opacity: 0.7 }}>
                                                {new Date(msg.createdAt).toLocaleString()}
                                            </small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Form onSubmit={handleSendMessage}>
                                <Form.Group controlId="chatMessage" className="mt-3">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Add Message" 
                                        style={{ fontFamily: 'Lato', fontWeight: 500 }}
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                    />
                                </Form.Group>
                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    className="mt-3" 
                                    style={{ backgroundColor: '#FF6477', borderColor: '#FF6477', fontFamily: "Lato", fontWeight: 700 }}
                                >
                                    Send
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ChatSupport;