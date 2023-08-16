import React, { useState,useEffect } from 'react';
import {  GoogleOutlined, UserOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Button, Input } from 'antd';
import { notification } from 'antd';
import { useNavigate } from "react-router-dom";
import CheckAuth from '../Firestore/CheckAuth';



import firebase from 'firebase/compat/app';
import { firebaseApp } from '../Firestore/firebaseconfig'; 
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



export default function Login() {

     const tokenExist = CheckAuth();
     const navigate = useNavigate();
     const [username,setusername]= useState("");
     const [password,setpassword]=useState("");

     useEffect(() => {
        if (tokenExist) {
            navigate("/securedpage"); // Redirect to secured page if already authenticated
        }
    }, [tokenExist, navigate]);

    const updateUsername =(event)=>{
        setusername(event.target.value)
    }
    const updatePassword =(event)=>{
        setpassword(event.target.value)
    }

    const userLogin=()=>{
        if(username.length!==0 && password.length!==0)
       {     
            const auth = getAuth(firebaseApp);
                    signInWithEmailAndPassword(auth, username, password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        const authToken = user.accessToken; 
                        localStorage.setItem('authToken', authToken);
                        notification.success({
                            message: 'Login Success',
                            description: "Successfully Logged in please wait",
                        })
                        navigate("/securedpage");
                        // return redirect("/securedpage");

                    })
                    .catch((error) => {
                        const errorCode = error.code.replace('auth/', '').replace(/-/g, ' ');
                        // const errorMessage = error.message;
                        notification.error({
                            message: 'Login Error',
                            description: errorCode,
                          });
                        
                    });
        }
        else{
            notification.error({
                message: 'Login Error',
                description: "Email or Password field is empty",
              });
        }
    }

    
    async function loginWithGoogle(){
        try{
        var provider = new firebase.auth.GoogleAuthProvider();
        const result =  await firebase.auth().signInWithPopup(provider)  
        const authToken = result.credential.accessToken; 
        localStorage.setItem('authToken', authToken);
        navigate("/securedpage");
        console.log(result.credential.accessToken)
        
        }catch(error){
            // console.log(error)
            const errorCode = error.code.replace('auth/', '').replace(/-/g, ' ');
            notification.error({
                message: 'Google Sign-In Error',
                description: errorCode,
              });
        }
    }
    

    // const [passwordVisible, setPasswordVisible] = React.useState(false);

    const loginContainer={
        height:'450px',
        width:'500px',
        backgroundColor:'#f0f0f0',
        borderRadius:'15px'
    }

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
                <Button type="primary" size="small" style={{width:"auto",height:'50px',fontSize:'16px',backgroundColor:"#F44336"}} onClick={loginWithGoogle}><GoogleOutlined/> Signin With Google</Button>  
            </div>
            <div style={{textAlign:'center',marginTop:'15px'}}>
                Don't have an account , <span style={{fontStyle:'italic',cursor:'pointer'}}><Link to='/signup' style={{ color:'unset',fontWeight:'600'}}>Create New Account</Link></span>
            </div>
           
        </div>
        <div style={{fontSize:'18px', color:'#ffff',fontWeight:'600',textTransform:'uppercase'}}>Copyright © 2023 <img src='KNEG.png'width='100px' alt='KNEG'/> </div>
    </div>
  )
}
