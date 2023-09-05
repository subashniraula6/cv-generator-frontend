import React, { useState,useEffect } from 'react'
import './homepage.css'
import { useNavigate } from 'react-router-dom'
import { MenuOutlined,InstagramOutlined,TwitterOutlined,FacebookFilled } from '@ant-design/icons'
// import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEarthEurope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

export default function Mainpage() {
    let navigate = useNavigate();

    // const testimonydata=[
    //     {
    //         testimonyavatar:'https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg',
    //         testimonyRating:5,
    //         testimonyQuote:'Really liked the simplicity of the service, would recommend for all my friends',
    //         testimonyName:'Stockholm'
    //     },
    //     {
    //         testimonyavatar:'https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg',
    //         testimonyRating:3,
    //         testimonyQuote:`I thought I'd try this service because I had nothing to lose, that led me to getting the job I wanted.`,
    //         testimonyName:'GothenBurg'
    //     },
    //     {
    //         testimonyavatar:'https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg',
    //         testimonyRating:4,
    //         testimonyQuote:'Really liked the simplicity of the service, would recommend for all my friends',
    //         testimonyName:'Denver'
    //     },
    //     {
    //         testimonyavatar:'https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg',
    //         testimonyRating:5,
    //         testimonyQuote:'Really liked the simplicity of the service, would recommend for all my friends',
    //         testimonyName:'Paris'
    //     }
    // ]

    const [showNavLinks, setShowNavLinks] = useState(window.innerWidth > 1200);
    const [slidePerView, setSlidePerView] = useState(window.innerWidth >= 1000 ? 2 : 1);

    const toggleNavLinks = () => {
        setShowNavLinks(!showNavLinks);
    };

    useEffect(() => {
        const handleResize = () => {
            setSlidePerView(window.innerWidth >= 1000 ? 2 : 1);
            setShowNavLinks(window.innerWidth > 1200);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

  return (
    <div style={{position:'relative',overflow:'hidden',backgroundColor:'black',color:'white'}}>
        <nav className='navbarHome'>
            <div style={{display:'flex'}}>
                <div style={{display:'flex',alignItems:'center'}}><img src="logo-kneg.png" width="25px" alt="KNEG" /></div>
                 <div style={{fontSize:'20px',fontWeight:'600',margin:'10px',padding:'10px 5px'}}>KNEG</div>
            </div>
            {showNavLinks && (
                <div className='homeNavLinks' style={{ display: showNavLinks ? 'block' : 'none' }}>
                    <ul>
                        <li>What we do</li>
                        <li>Our Services</li>
                        <li>Who we are</li>
                        <li>What people say</li>
                        <li>Our Partners</li>
                        <li>Companies we work with</li>
                        <li>Contact us</li>
                        {showNavLinks && (
                            <li onClick={()=> navigate("/login")}>Login</li>
                        )}
                    </ul>
                </div>
            )}
            <div className='menuBar'>
            <MenuOutlined style={{color:'rgb(149, 0, 255)',fontSize:'25px',cursor:'pointer'}} onClick={toggleNavLinks}/>
                {/* <Button text="home"></Button> */}
            </div>
        </nav>
        <main style={{width:'90%',margin:'50px auto 0px auto'}}>
            <div className='heroTextContainer'>
                <div className='heroText'>Your Path to Career Success Starts Here</div>
                <div className='heroSubText'>Elevate Your Career with Our CV/Resume Generator!</div>
                <button className="arrow-button" type='button' onClick={()=> navigate("/login")}>
                    <span className="button-text">Try now</span>
                    <span className="arrow"> &#10140;</span>
                </button>
            </div>
            <div style={{position:'relative'}}>
                <div className='appimageContainer'>
                    <img src='/image/appScreen.png' alt='appScreen' style={{height:'100%',width:'100%',border:'3px solid #9500ff'}}></img>
                </div>
            </div>
            <div className='contentContainer'>
                <div className="contentHeading">Available <span style={{color:'rgb(149, 0, 255)'}}>Jobs</span></div>
                <div className="contentParagraph">
                    You can see the jobs that are available on our website and send an application
                </div>
                <div className="contentParagraph">
                    <button className="arrow-button" type='button'>
                    <span className="button-text">Find Jobs</span>
                    <span className="arrow"> &#10140;</span>
                    </button>
                </div>
            </div>
            <div className="contentContainer">
                <div className="contentHeading">What <span style={{color:'rgb(149, 0, 255)'}}>we do</span></div>
                <div className="contentParagraph">
                    This is a job matching service that helps connect job seekers with companies
                    looking to hire staff. Our platform is designed to cater to job seekers who
                    are registered with Arbetsförmedlingen's Rusta and match programs, as well
                    as other interested candidates.
                </div>
                <div className="coloredContainer">
                    <div className="coloredContainerHeading">Get your recruitment in order</div>
                    <div className="splitedContainer">
                    <div className="splitLeft">
                        Most employers rely on our matching service to complement their recruitment processes and fulfill their hiring requirements. Our efficient and dependable team provides them with the necessary support to identify and acquire the right personnel.
                    </div>
                    <div className="splitRight">
                        <img src="https://a050aa25215f68b1a1f1984268374d96.cdn.bubble.io/f1690726984722x418448075237417100/KNEG.svg" alt="knegImage"/>
                    </div>
                    </div>
                    <div className="contactUsBtn">Contact Us</div>
                </div>
            </div>
            <div className="contentContainer">
                <div className="contentHeading">Our <span style={{color:'rgb(149, 0, 255)'}}>Services</span></div>
                <div className="coloredContainer">
                    <div className="coloredContainerHeading">Rusta och Matcha(KROM)</div>
                    <div className="splitedContainer">
                    <div className="splitLeft">
                        Our service is mainly targeted towards companies that work with Rusta och Matcha service etc........
                    </div>
                    <div className="splitRight">
                        <img src="https://a050aa25215f68b1a1f1984268374d96.cdn.bubble.io/f1690726984722x418448075237417100/KNEG.svg" alt="knegImage" />
                    </div>
                    </div>
                    <div className="contactUsBtn">Contact Us</div>
                </div>
            </div>
            <div className='contentContainer'>
                <div className="contentHeading">FAQ</div>
            </div>
        </main>
        <footer style={{display:'flex',width:'90%',margin:'10px auto',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{display:'flex'}}>
                <div style={{display:'flex',alignItems:'center'}}><img src="logo-kneg.png" width="25px" alt="KNEG" /></div>
                 <div style={{fontSize:'20px',fontWeight:'600',margin:'10px',padding:'10px 5px'}}>KNEG</div>
            </div>
            <div style={{fontSize:'25px'}} className='homeSocialLinks'>
                <InstagramOutlined />
                <TwitterOutlined />
                <FacebookFilled />
            </div>
            <div>
                ⓒ All rights reserved
            </div>
        </footer>
    </div>
  )
}
