import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input,notification } from 'antd';

import { useNavigate } from "react-router-dom";
import CheckAuth from '../Firestore/CheckAuth';

import { firebaseApp } from '../Firestore/firebaseconfig'; 
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";


export default function Signup() {
    
    const [password,setpassword]=useState("");
    const [email,setemail]=useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const tokenExist = CheckAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (tokenExist) {
            navigate("/securedpage"); // Redirect to secured page if already authenticated
        }
    }, [tokenExist, navigate]);


    const updatePassword =(event)=>{
        setpassword(event.target.value)
    }
    const updateEmail =(e)=>{
        setemail(e.target.value)
    }

    const updateCPassword =(event)=>{
        const enteredConfirmPassword = event.target.value;
        setPasswordMatch(enteredConfirmPassword === password);
    }

    const signUpEmailPass =()=>{
        if(email.length!==0 && passwordMatch)
        {
            const auth = getAuth(firebaseApp);
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const authToken = userCredential.user.accessToken;
                localStorage.setItem('authToken', authToken);
                notification.success({
                    message: 'Signup Success',
                    description: "Successfully created an account and logged in",
                })
            })
            .catch((error) => {
                // const errorCode = error.code;
                const errorCode = error.code.replace('auth/', '').replace(/-/g, ' ');
                notification.error({
                    message: 'Signup Error',
                    description: errorCode,
                })
            });
        }
        else if(email.length===0){
            notification.error({
                message: 'Signup Error',
                description: "Email is empty",
            })
        }
        else{
            notification.error({
                message: 'Signup Error',
                description: "Password doesn't match",
            })
        }
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
                create an account to generate ATS friendly resume
            </div>
            <div style={{display:'flex',width:'90%',margin:'0px auto'}}>
                <Input size="large" placeholder="First Name" prefix={<UserOutlined />} style={{padding:'10px',marginRight:'2px'}} className='mBottom' id='firstName' disabled/>
                <Input size="large" placeholder="Last Name" style={{padding:'10px'}} className='mBottom' id='lastName' disabled/>
            </div>
            <div style={{width:'90%',margin:'0px auto'}}>
                <Input size="large" placeholder="Email Address" type="email" prefix={<MailOutlined />} style={{padding:'10px'}} className='mBottom' id='emailAddress' required onChange={(text)=> {updateEmail(text)}}/>
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
                <Button type="primary" size="large" style={{width:"200px",height:'50px',fontSize:'20px',backgroundColor:"rgb(149, 0, 255)"}} onClick={signUpEmailPass}>Signup</Button>
            </div>
            <div style={{textAlign:'center'}}>
                Already have an account , <span style={{fontStyle:'italic',cursor:'pointer'}}><Link to='/login' style={{ color:'unset',fontWeight:'600'}}>Login</Link></span>
            </div>
        </div>
        <div style={{fontSize:'18px', color:'#ffff',fontWeight:'600',textTransform:'uppercase'}}>Copyright © 2023 <img src='KNEG.png'width='100px' alt='KNEG'/></div>
    </div>
  )
}
