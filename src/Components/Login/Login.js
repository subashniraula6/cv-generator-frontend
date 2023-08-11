import React, { useState } from 'react';
import {  GoogleOutlined, UserOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Button, Input } from 'antd';

export default function Login() {

    const [username,setusername]= useState("");
    const [password,setpassword]=useState("");

    const loginContainer={
        height:'450px',
        width:'500px',
        backgroundColor:'#f0f0f0',
        borderRadius:'15px'
    }


    const updateUsername =(event)=>{
        setusername(event.target.value)
    }
    const updatePassword =(event)=>{
        setpassword(event.target.value)
    }
    const userLogin=()=>{
        console.log(username)
        console.log(password)
    }

    
    // const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <div className='loginPage'>     
        <div style={loginContainer}>
            <h1 style={{textAlign:'center',margin:'20px 0px',textTransform:'uppercase'}}>Login</h1>
            <div className='loginTextDescription' style={{textAlign:'center',marginBottom:'10px'}}>
                Login and start creating resume
            </div>
            <div style={{width:'90%',margin:'0px auto'}}>
                <Input size="large" type="email" placeholder="Email Address" prefix={<UserOutlined />} style={{padding:'10px'}} className='mBottom' onChange={(text)=> {updateUsername(text)}}/>
            </div>
            <div style={{width:'90%',margin:'0px auto',position:"relative"}}>
                    <Input.Password size="large"
                        placeholder="Password"
                        // status='error'
                        // prefix={<ClockCircleOutlined/>}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    style={{padding:'10px'}} className='mBottom' onChange={(text)=> {updatePassword(text)}} required />
                    <div style={{position:"absolute",right:'0px',cursor:"pointer"}}><Link to='/forgot-password' style={{ color:'unset',fontWeight:'600'}}>Forgot Password ?</Link></div>
            </div>
            <div className='flex-container' style={{justifyContent:'center',backgroundColor:'unset',marginTop:"20px"}}>
                <Button type="primary" size="large" style={{width:"200px",height:'50px',fontSize:'20px',backgroundColor:"rgb(149, 0, 255)"}} onClick={userLogin}>Login</Button>
            </div>
            <div style={{display:'flex',justifyContent:'center',backgroundColor:'unset'}}>
                <Button type="primary" size="small" style={{width:"auto",height:'50px',fontSize:'16px',backgroundColor:"#F44336"}} onClick={userLogin}><GoogleOutlined/> Signin With Google</Button>  
            </div>
            <div style={{textAlign:'center'}}>
                Don't have an account , <span style={{fontStyle:'italic',cursor:'pointer'}}><Link to='/signup' style={{ color:'unset',fontWeight:'600'}}>Create New Account</Link></span>
            </div>
           
        </div>
        <div style={{fontSize:'18px', color:'#ffff',fontWeight:'600',textTransform:'uppercase'}}>Copyright © 2023 <img src='KNEG.png'width='100px' alt='KNEG'/> </div>
    </div>
  )
}
