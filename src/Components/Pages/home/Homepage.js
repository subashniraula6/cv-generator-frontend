import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthEurope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom'

// import Button from '../Wrappers/Button'
import "./homepage.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import {
  MenuOutlined,
  InstagramOutlined,
  TwitterOutlined,
  FacebookFilled,
} from "@ant-design/icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

export default function Homepage() {
    let navigate = useNavigate();
  const testimonydata = [
    {
      testimonyavatar:
        "https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg",
      testimonyRating: 5,
      testimonyQuote:
        "Really liked the simplicity of the service, would recommend for all my friends",
      testimonyName: "Stockholm",
    },
    {
      testimonyavatar:
        "https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg",
      testimonyRating: 3,
      testimonyQuote: `I thought I'd try this service because I had nothing to lose, that led me to getting the job I wanted.`,
      testimonyName: "GothenBurg",
    },
    {
      testimonyavatar:
        "https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg",
      testimonyRating: 4,
      testimonyQuote:
        "Really liked the simplicity of the service, would recommend for all my friends",
      testimonyName: "Denver",
    },
    {
      testimonyavatar:
        "https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg",
      testimonyRating: 5,
      testimonyQuote:
        "Really liked the simplicity of the service, would recommend for all my friends",
      testimonyName: "Paris",
    },
  ];

  const [showNavLinks, setShowNavLinks] = useState(window.innerWidth > 1200);
  const [slidePerView, setSlidePerView] = useState(
    window.innerWidth >= 1000 ? 2 : 1
  );

  const toggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  useEffect(() => {
    const handleResize = () => {
      setSlidePerView(window.innerWidth >= 1000 ? 2 : 1);
      setShowNavLinks(window.innerWidth > 1200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <nav className="navbarHome">
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src="logo-kneg.png" width="25px" alt="KNEG" />
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "600",
              margin: "10px",
              padding: "10px 5px",
            }}
          >
            KNEG
          </div>
        </div>
        {showNavLinks && (
          <div
            className="homeNavLinks"
            style={{ display: showNavLinks ? "block" : "none" }}
          >
            <ul>
              <li>What we do</li>
              <li>Our Services</li>
              <li>Who we are</li>
              <li>What people say</li>
              <li>Our Partners</li>
              <li>Companies we work with</li>
              <li>Contact us</li>
              <li onClick={()=> navigate("/login")}>Login</li>
            </ul>
          </div>
        )}
        <div className="menuBar">
          <MenuOutlined
            style={{
              color: "rgb(149, 0, 255)",
              fontSize: "25px",
              cursor: "pointer",
            }}
            onClick={toggleNavLinks}
          />
          {/* <Button text="home"></Button> */}
        </div>
      </nav>
      <main style={{ width: "90%", margin: "150px auto 0px auto" }}>
        <div
          className="highlightImageContainer"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              width: "150px",
              padding: "20px",
              borderRadius: "20px",
              boxShadow: "rgb(0 0 0 / 14%) 0px 0px 8px 4px",
            }}
          >
            <img
              src="logo-kneg.png"
              style={{ height: "100%", width: "100%" }}
              alt="KNEG"
            />
          </div>
        </div>
        <div className="contentContainer">
          <div className="contentHeading">What we do</div>
          <div className="contentParagraph">
            This is a job matching service that helps connect job seekers with
            companies looking to hire staff. Our platform is designed to cater
            to job seekers who are registered with Arbetsförmedlingen's Rusta
            and match programs, as well as other interested candidates.
          </div>
          <div className="coloredContainer">
            <div className="coloredContainerHeading">
              Get your recruitment in order
            </div>
            <div className="splitedContainer">
              <div className="splitLeft">
                Most employers rely on our matching service to complement their
                recruitment processes and fulfill their hiring requirements. Our
                efficient and dependable team provides them with the necessary
                support to identify and acquire the right personnel.
              </div>
              <div className="splitRight">
                <img
                  src="https://a050aa25215f68b1a1f1984268374d96.cdn.bubble.io/f1690726984722x418448075237417100/KNEG.svg"
                  alt="knegImage"
                />
              </div>
            </div>
            <div className="contactUsBtn">Contact Us</div>
          </div>
        </div>
        <div className="contentContainer">
          <div className="contentHeading">Our Services</div>
          <div className="coloredContainer">
            <div className="coloredContainerHeading">
              Rusta och Matcha(KROM)
            </div>
            <div className="splitedContainer">
              <div className="splitLeft">
                Our service is mainly targeted towards companies that work with
                Rusta och Matcha service etc........
              </div>
              <div className="splitRight">
                <img
                  src="https://a050aa25215f68b1a1f1984268374d96.cdn.bubble.io/f1690726984722x418448075237417100/KNEG.svg"
                  alt="knegImage"
                />
              </div>
            </div>
            <div className="contactUsBtn">Contact Us</div>
          </div>
        </div>
        <div className="contentContainer">
          <div className="contentHeading">What People Say</div>
          <div className="contentParagraph">
            See what some of the people that got a job through us say!
          </div>
          <div className="testimoniesContainer">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={slidePerView}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {testimonydata.map((data, index) => (
                <SwiperSlide key={index} style={{ marginBottom: "10px" }}>
                  <div className="testimonyContainer">
                    <div className="testimonyLeft">
                      <div className="testimonyAvatar">
                        <img
                          src={data.testimonyavatar}
                          style={{ height: "100%", width: "100%" }}
                          alt={data.testimonyName}
                        />
                      </div>
                      <div className="testimoyRating">
                        {[...Array(data.testimonyRating)].map((_, i) => (
                          <span key={i} role="img" aria-label="star">
                            ⭐️
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="testimonyRight">
                      <div className="testimonyQuote">
                        "{data.testimonyQuote}"
                      </div>
                      <div className="testimonyName">{data.testimonyName}</div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="contentContainer">
          <div className="contentHeading">
            People We Helped{" "}
            <span style={{ color: "rgb(149, 0, 255)" }}>Employ</span>
          </div>
          <div
            className={`contentParagraph imgFit`}
            style={{ width: "70%", margin: "0px auto" }}
          >
            <img
              src="./image/chart.png"
              alt="chart"
              style={{ width: "100%" }}
            ></img>
          </div>
        </div>
        <div className="contentContainer">
          <div className="contentHeading">
            Available <span style={{ color: "rgb(149, 0, 255)" }}>Jobs</span>
          </div>
          <div className="contentParagraph">
            You can see the jobs that are available on our website and send an
            application
          </div>
          <div className="contentParagraph">
            <button className="arrow-button" type="button">
              <span className="button-text">Find Jobs</span>
              <span className="arrow"> &#10140;</span>
            </button>
          </div>
        </div>
        <div className="contentContainer">
          <div className="contentHeading">Our Partners</div>
          <div className="grid-container">
            <div className="grid-item">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <img src="logo-kneg.png" width="55px" alt="KNEG" /> Kneg
              </div>
            </div>
            <div className="grid-item">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src="logo-kneg-long.jpg" width="250px" alt="KNEG" />
              </div>
            </div>
            <div className="grid-item">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <img src="logo-kneg-bw.png" width="155px" alt="KNEG" />
              </div>
            </div>
            <div className="grid-item">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src="logo-kneg-long.jpg" width="250px" alt="KNEG" />
              </div>
            </div>
            <div className="grid-item">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <img src="logo-kneg-bw.png" width="155px" alt="KNEG" />
              </div>
            </div>
            <div className="grid-item">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src="logo-kneg.png" width="55px" alt="KNEG" /> Kneg
              </div>
            </div>
          </div>
        </div>
        <div className="contentContainer">
          <div className="contentHeading">Companies we worked with</div>
          <div className="grid-container">
            <div className="grid-item">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <img src="logo-kneg.png" width="55px" alt="KNEG" /> Kneg
              </div>
            </div>
            <div className="grid-item">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src="logo-kneg-long.jpg" width="250px" alt="KNEG" />
              </div>
            </div>
            <div className="grid-item">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <img src="logo-kneg-bw.png" width="155px" alt="KNEG" />
              </div>
            </div>
            <div className="grid-item">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src="logo-kneg-long.jpg" width="250px" alt="KNEG" />
              </div>
            </div>
            <div className="grid-item">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <img src="logo-kneg-bw.png" width="155px" alt="KNEG" />
              </div>
            </div>
            <div className="grid-item">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src="logo-kneg.png" width="55px" alt="KNEG" /> Kneg
              </div>
            </div>
          </div>
        </div>
        <div className="contentContainer">
          <div className="contentHeading">Contact Us</div>
          <div className="contactFormContainer">
            <div className="contactForm">
              <div className="formHead">Send Us A Message</div>
              <div className="inputContainer">
                <div style={{ margin: "10px 0px" }}>Name</div>
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="inputField"
                  />
                </div>
              </div>
              <div className="inputContainer">
                <div style={{ margin: "10px 0px" }}>Email</div>
                <div>
                  <input
                    type="text"
                    placeholder="Email"
                    className="inputField"
                  />
                </div>
              </div>
              <div className="inputContainer">
                <div style={{ margin: "10px 0px" }}>Subject</div>
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="inputField"
                  />
                </div>
              </div>
              <div className="inputContainer">
                <div style={{ margin: "10px 0px" }}>Message</div>
                <div>
                  <input
                    type="text"
                    placeholder="Message"
                    className="inputField"
                  />
                </div>
              </div>
              <div className="contactUsBtn" style={{ margin: "20px 0px" }}>
                Send Message
              </div>
            </div>
            <div className="contactDetails">
              <div className="formHead">Contact Us</div>
              <div className="formDetails">
                We're open for any suggestion or just to have a chat
              </div>
              <div className="detailContainer">
                <FontAwesomeIcon icon={faLocationDot} className="iconSall" />
                <span style={{ fontWeight: 600 }}>
                  Address: Vasagatan 10 stockholm
                </span>
              </div>
              <div className="detailContainer">
                <FontAwesomeIcon icon={faPhone} className="iconSall" />
                <span style={{ fontWeight: 600 }}>Phone: +1235 2355 98</span>
              </div>
              <div className="detailContainer">
                <FontAwesomeIcon icon={faPaperPlane} className="iconSall" />
                <span style={{ fontWeight: 600 }}>
                  Email: info@yoursite.com
                </span>
              </div>
              <div className="detailContainer">
                <FontAwesomeIcon icon={faEarthEurope} className="iconSall" />
                <span style={{ fontWeight: 600 }}>Website: Jobb.kneg.net</span>
              </div>
            </div>
          </div>
        </div>
        <div className="contentContainer">
          <div className="contentHeading">FAQ</div>
        </div>
      </main>
      <footer
        style={{
          display: "flex",
          width: "90%",
          margin: "10px auto",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src="logo-kneg.png" width="25px" alt="KNEG" />
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "600",
              margin: "10px",
              padding: "10px 5px",
            }}
          >
            KNEG
          </div>
        </div>
        <div style={{ fontSize: "25px" }} className="homeSocialLinks">
          <InstagramOutlined />
          <TwitterOutlined />
          <FacebookFilled />
        </div>
        <div>ⓒ All rights reserved</div>
      </footer>
    </div>
  );
}
