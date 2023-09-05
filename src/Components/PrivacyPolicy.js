import React, { useState } from 'react';

import { InstagramOutlined,TwitterOutlined,FacebookFilled } from '@ant-design/icons'

export default function PrivacyPolicy() {
  return (
    <div style={{position:'relative'}}>
        <div style={{padding:'20px 10px'}}>
            <div className='heroText' style={{textAlign:'center'}}>Privacy Policy</div>
            <div className='contentCollapsableContainer'>
            <div className={`collapsible open`}>
                <div className="collapsible-heading"  style={{display:'flex',justifyContent:'space-between'}}>
                    <h2>1. Introduction</h2>    
                </div>
                    <div className="collapsible-content">
                    <p>Welcome to KNEG. At KNEG, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and protect your data when you use our CV generation services.</p>
                    </div>
                </div>
            </div>
            <h2 style={{margin:'0px 15px'}}>2. Information We Collect</h2>
            <div className='contentCollapsableContainer'>
            <div className={`collapsible open`}>
                <div className="collapsible-heading" style={{display:'flex',justifyContent:'space-between'}}>
                    <h2>2.1 Personal Information</h2>
                </div>
                    <div className="collapsible-content">
                    <p>We may collect the following personal information from you:</p>
                        <ul style={{listStyle:'disc',margin:'0px 10px'}}>
                            <li style={{float:'none'}}>Name: To personalize your CV.</li>
                            <li style={{float:'none'}}>Contact Information: Including email address and phone number for contact purposes.</li>
                            <li style={{float:'none'}}>Education History: Including schools attended and degrees obtained.</li>
                            <li style={{float:'none'}}>Work History: Including previous employers and job positions.</li>
                            <li style={{float:'none'}}>Skills: Including technical and soft skills.</li>
                            <li style={{float:'none'}}>Other Information: Such as your address, certifications, and references, as provided by you.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='contentCollapsableContainer'>
            <div className={`collapsible open`}>
                <div className="collapsible-heading"  style={{display:'flex',justifyContent:'space-between'}}>
                    <h2>2.2 Usage Data</h2>   
                </div>
                    <div className="collapsible-content">
                    <p>We collect non-personal information about how you use our Website, including IP addresses, browser type, pages visited, and other analytics data.</p>
                    </div>
                </div>
            </div>
            <div className='contentCollapsableContainer'>
            <div className={`collapsible open`}>
                <div className="collapsible-heading"  style={{display:'flex',justifyContent:'space-between'}}>
                    <h2>3. How We Use Your Information</h2>    
                </div>
                    <div className="collapsible-content">
                    <p>We use your information for the following purposes:</p>
                    <ul style={{listStyle:'initial',margin:'0px 10px'}}>
                        <li style={{float:'none'}}>To create and customize your CV based on the information you provide.</li>
                        <li style={{float:'none'}}>To communicate with you regarding our services or to respond to your inquiries.</li>
                        <li style={{float:'none'}}>To improve and optimize our Website and services.</li>
                        <li style={{float:'none'}}>To comply with legal obligations.</li>
                    </ul>
                    </div>
                </div>
            </div>
            <div className='contentCollapsableContainer'>
            <div className={`collapsible open`}>
                <div className="collapsible-heading"  style={{display:'flex',justifyContent:'space-between'}}>
                    <h2>4. Cookies and Tracking Technologies</h2>
                </div>
                    <div className="collapsible-content">
                    <p>We use cookies and similar tracking technologies to enhance your user experience and gather analytics data. You can manage your cookie preferences through your browser settings.</p>
                    </div>
                </div>
            </div>
            <div className='contentCollapsableContainer'>
            <div className={`collapsible open`}>
                <div className="collapsible-heading"  style={{display:'flex',justifyContent:'space-between'}}>
                    <h2>5. Your Choices</h2>
                </div>
                    <div className="collapsible-content">
                    <p>You have the right to access, correct, or delete your personal information. You can also withdraw your consent for processing at any time by contacting us at [contact@email.com].</p>
                    </div>
                </div>
            </div>
            <div className='contentCollapsableContainer'>
            <div className={`collapsible open`}>
                <div className="collapsible-heading"  style={{display:'flex',justifyContent:'space-between'}}>
                    <h2>6. Contact Us</h2>
                </div>
                    <div className="collapsible-content">
                    <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at [contact@email.com].</p>
                    </div>
                </div>
            </div>
        </div>
        
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
