import React from "react";
import phone from "../assets/phone.svg";
import mail from "../assets/mail.svg";
import linkedin from "../assets/linkedin.svg";
import logo from "../assets/4@2x.png";
import { Link } from "react-router-dom";
import { Instagram, PlaceOutlined, WhatsApp } from "@mui/icons-material";

const Footer = () => {
  return (
    <div className="footer  pt-4 container-fluid font-lato-Medium">
      <div className="px-5 inner_footer pb-5 footer-content">
        <div className="" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Link to="/">
            <img className="footer_logo"
              style={{ cursor: "pointer", width: "150px" }}
              loading="lazy"
              alt=""
              src={logo}
            />
          </Link>
        </div>

        <div className="responsive-mobile-div">
          <div className="foot_img">


            <h5 className="mt-5" style={{ fontFamily: "Lato", fontWeight: 500, fontSize: "18px" }}>We are Social!</h5>
            <div className="d-flex align-items-center gap-3 mt-4">
              <a href="https://wa.me/message/SMDIYPHGQFQRC1" target="_blank" className="f_contact">
                <WhatsApp />
              </a>
              <a href="https://www.linkedin.com/company/edulley/" target="_blank" className="f_contact">
                <img style={{ width: "1.5rem", height: "1.5rem" }} className="" loading="lazy" alt="" src={linkedin} />
              </a>
              <a href="https://www.instagram.com/edulley_india/" target="_blank" className="f_contact">
                <Instagram />
              </a>
            </div>
          </div>

        </div>
        <div className="">
          <ul>
            <div className="d-flex flex-column    gap-3 mt-3   mobile-res">
              <div className="d-flex align-items-center gap-3">
                <div className="f_contact">
                  <img className="" loading="lazy" alt="" src={phone} />
                </div>
                <div>
                  <p style={{ cursor: "pointer", fontFamily: "Lato", fontWeight: 500 }} onClick={() => window.location.href = "tel:+91-9991903000"}>+91-9991903000</p>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 mt-3">
                <div className="f_contact">
                  <img className="" loading="lazy" alt="" src={mail} />
                </div>
                <div>
                  <p style={{ cursor: "pointer", fontFamily: "Lato", fontWeight: 500 }} onClick={() => window.location.href = "mailto:info@edulley.com"}>info@edulley.com</p>
                </div>

              </div>
              <div className="d-flex align-items-center gap-3 mt-3">
                <div className="f_contact">
                  <PlaceOutlined />
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'left',
                  textAlign: 'left',
                  width: '100%'
                }}>
                  <div style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '100%',
                    fontFamily: 'Lato', fontWeight: 500
                  }}>
                    6TH FLOOR, Premiere House-1,
                  </div>
                  <div style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontFamily: 'Lato', fontWeight: 500,

                    width: '100%'
                  }}>
                    opposite Gurudwara, Bodakdev,
                  </div>
                  <div style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontFamily: 'Lato', fontWeight: 500,

                    width: '100%'
                  }}>
                    Ahmedabad, Gujarat 380054

                  </div>
                </div>

              </div>
              <div className="d-flex align-items-center gap-3 mt-3">
                <div className="f_contact">
                  <PlaceOutlined />
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'left',
                  textAlign: 'left',
                  width: '100%'
                }}>
                  <div style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '100%',
                    fontFamily: 'Lato', fontWeight: 500
                  }}>
                    1st Floor, above National medical store,
                  </div>
                  <div style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontFamily: 'Lato', fontWeight: 500,
                    width: '100%'
                  }}>
                    Main Bazar, Jhajjar
                  </div>
                  <div style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontFamily: 'Lato', fontWeight: 500,
                    width: '100%'
                  }}>
                    Haryana 124103
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </div>

        <div className="f_menu footer-column">
          <h5 style={{ fontFamily: "Lato", fontWeight: 500 }}>Countries</h5>
          <ul>
          <Link to="/institutions">
            <li style={{ fontFamily: "Lato", fontWeight: 500 }}>The USA</li>
            </Link>
            <Link to="/institutions">
            <li style={{ fontFamily: "Lato", fontWeight: 500 }}>The UK</li>
            </Link>
            <Link to="/institutions">
            <li style={{ fontFamily: "Lato", fontWeight: 500 }}>Canada</li>
            </Link>
            <Link to="/institutions">
            <li style={{ fontFamily: "Lato", fontWeight: 500 }}>Australia</li>
            </Link>
            <Link to="/institutions">
            <li style={{ fontFamily: "Lato", fontWeight: 500 }}>Ireland</li>
            </Link>
            <Link to="/institutions">
            <li style={{ fontFamily: "Lato", fontWeight: 500 }}>France</li>
            </Link>
          </ul>
        </div>
        <div className="f_menu footer-column">
          <h5 style={{ fontFamily: "Lato", fontWeight: 500 }}>Exams</h5>
          <ul>
            <Link to="/exam-ielts">
              <li style={{ cursor: "pointer", fontFamily: "Lato", fontWeight: 500 }}>IELTS</li>
            </Link>
            <li style={{ fontFamily: "Lato", fontWeight: 500 }}>TOEFL</li>
            <li style={{ fontFamily: "Lato", fontWeight: 500 }}>PTE</li>
            <li style={{ fontFamily: "Lato", fontWeight: 500 }}>GRE</li>
            <li style={{ fontFamily: "Lato", fontWeight: 500 }}>GMAT</li>
            <li style={{ fontFamily: "Lato", fontWeight: 500 }}>DET</li>
          </ul>
        </div>
        <div className="f_menu footer-column">
          <h5 style={{ fontFamily: "Lato", fontWeight: 500 }}>Company</h5>
          <ul>
            <Link to="/career-path">

              <li style={{ cursor: "pointer", fontFamily: "Lato", fontWeight: 500 }}>
                Career
              </li>
            </Link>
            <Link to="/courses">
              <li style={{ cursor: "pointer", fontFamily: "Lato", fontWeight: 500 }}>Courses</li>
            </Link>
            <Link to="/institutions">
              <li style={{ cursor: "pointer", fontFamily: "Lato", fontWeight: 500 }}>Institutions</li>
            </Link>
            <Link to="/scholarship">
              <li style={{ cursor: "pointer", fontFamily: "Lato", fontWeight: 500 }}>Scholarship</li>
            </Link>
            <Link to="faq">
              <li style={{ cursor: "pointer", fontFamily: "Lato", fontWeight: 500 }}>FAQ</li>
            </Link>
            <Link to="blog">
              <li style={{ cursor: "pointer", fontFamily: "Lato", fontWeight: 500 }}>Blog</li>
            </Link>
          </ul>
        </div>

        <div className="f_menu footer-column">
          <h5 style={{ fontFamily: "Lato", fontWeight: 500 }}>Others</h5>
          <ul>
            <Link to="/sop">
              <li style={{ cursor: "pointer", fontFamily: "Lato", fontWeight: 500 }}>SOP</li>
            </Link>
            <Link to="/lor">
              <li style={{ cursor: "pointer", fontFamily: "Lato", fontWeight: 500 }}>LOR</li>
            </Link>
            <Link to="/privacy-policy">
              <li style={{ cursor: "pointer", fontFamily: "Lato", fontWeight: 500 }}>Privacy Policy</li>
            </Link>
            <Link to="/terms-and-condition">
              <li style={{ cursor: "pointer", fontFamily: "Lato", fontWeight: 500 }}>Terms & Condition</li>
            </Link>
            <Link to="/refund-policy">
              <li style={{ cursor: "pointer", fontFamily: "Lato", fontWeight: 500 }}>Refund Policy</li>
            </Link>
            <Link to="/blog">
              <span onClick={() => { localStorage.setItem('redirectToAboutUs', true) }}>
                <li style={{ cursor: "pointer", fontFamily: "Lato", fontWeight: 500 }}>About Us</li>
              </span>

            </Link>

          </ul>
        </div>
      </div>
      <p
        className="text-center text-white py-3"
        style={{
          borderTop: "1px solid white",
          fontFamily: "Lato", fontWeight: 500,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%'
        }}
      >
        Copyright © 2026 | All rights reserved by Edulley
      </p>
    </div>
  );
};

export default Footer;
