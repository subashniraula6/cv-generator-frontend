import React from 'react'
// import Button from '../Wrappers/Button'
import './homepage.css'

export default function homepage() {
  return (
    <div style={{position:'relative'}}>
        <nav className='navbarHome'>
            <div style={{display:'flex'}}>
                <div style={{display:'flex',alignItems:'center'}}><img src="logo-kneg.png" width="25px" alt="KNEG" /></div>
                 <div style={{fontSize:'20px',fontWeight:'600',margin:'10px',padding:'10px 5px'}}>KNEG</div>
            </div>
            <div>
                <ul>
                    <li>What we do</li>
                        <li>Our Services</li>
                        <li>Who we are</li>
                        <li>What people say</li>
                        <li>Our Partners</li>
                        <li>Companies we work with</li>
                        <li>Contact us</li>
                </ul>
            </div>
            {/* <div>Hamburger */}
                {/* <Button text="home"></Button> */}
            {/* </div> */}
        </nav>
    </div>
  )
}
