import React,{useState} from 'react';

import { Link } from 'react-router-dom';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input } from 'antd';

export default function Signup() {
    
    const [password,setpassword]=useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);

    const updatePassword =(event)=>{
        setpassword(event.target.value)
    }

    const updateCPassword =(event)=>{
        const enteredConfirmPassword = event.target.value;
        setPasswordMatch(enteredConfirmPassword === password);
    }

    const loginContainer={
        height:'500px',
        width:'500px',
        backgroundColor:'#f0f0f0',
        borderRadius:'15px'
    }
    // const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <div className='loginPage'>     
        <div style={loginContainer}>
            <h1 style={{textAlign:'center',margin:'20px 0px'}}>Create An Account</h1>
            <div className='loginTextDescription' style={{textAlign:'center',marginBottom:'10px'}}>
                create an account to generate ats friendly resume
            </div>
            <div style={{display:'flex',width:'90%',margin:'0px auto'}}>
                <Input size="large" placeholder="First Name" prefix={<UserOutlined />} style={{padding:'10px',marginRight:'2px'}} className='mBottom' id='firstName'/>
                <Input size="large" placeholder="Last Name" style={{padding:'10px'}} className='mBottom' id='lastName'/>
            </div>
            <div style={{width:'90%',margin:'0px auto'}}>
                <Input size="large" placeholder="Email Address" prefix={<MailOutlined />} style={{padding:'10px'}} className='mBottom' id='emailAddress'/>
            </div>
            <div style={{width:'90%',margin:'0px auto'}}>
                    <Input.Password size="large"
                        placeholder="Password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    style={{padding:'10px'}} className='mBottom' onChange={(text)=> {updatePassword(text)}}/>
            </div>
            <div style={{width:'90%',margin:'0px auto'}}>
                    <Input.Password size="large"
                        status={!passwordMatch ? "error":''}
                        placeholder="Confirm Password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    style={{padding:'10px'}} className='mBottom' onChange={(text)=> {updateCPassword(text)}}/>
            </div>
            <div className='flex-container' style={{justifyContent:'center',backgroundColor:'unset',marginTop:"20px"}}>
                <Button type="primary" size="large" style={{width:"200px",height:'50px',fontSize:'20px',backgroundColor:"rgb(149, 0, 255)"}}>Signup</Button>
            </div>
            <div style={{textAlign:'center'}}>
                Already have an account , <span style={{fontStyle:'italic',cursor:'pointer'}}><Link to='/login' style={{ color:'unset',fontWeight:'600'}}>Login</Link></span>
            </div>
        </div>
        <div style={{fontSize:'18px', color:'#ffff',fontWeight:'600',textTransform:'uppercase'}}>Copyright © 2023 <img src='KNEG.png'width='100px' alt='KNEG'/></div>
    </div>
  )
}
