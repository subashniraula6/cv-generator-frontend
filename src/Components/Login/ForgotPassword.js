import React,{useState} from 'react'
import { Button, Input,notification } from 'antd';
import { MailOutlined } from '@ant-design/icons';

// import { firebaseApp } from '../Firestore/firebaseconfig'; 
import { getAuth, sendPasswordResetEmail } from "firebase/auth"

export default function ForgotPassword() {
    const [username,setusername]= useState("");
    const [sentEmail,setsentEmail]=useState(false);
    const loginContainer={
        height:'300px',
        width:'500px',
        backgroundColor:'#f0f0f0',
        borderRadius:'15px'
    }

    const updateUsername =(event)=>{
        setusername(event.target.value)
    }
   
    const resetPassword =()=>{
        if(username.length!==0)
        { 
            const auth = getAuth();
                sendPasswordResetEmail(auth, username)
                .then(() => {
                    setsentEmail(true)
                    notification.success({
                        message: 'Email sent',
                        description: "Successfully sent the activation link",
                    })
                })
                .catch((error) => {
                    const errorCode = error.code.replace('auth/', '').replace(/-/g, ' ');
                    notification.error({
                        message: 'Invalid Email',
                        description: errorCode
                    })
                });
            console.log(username)   
        }
        else{
            notification.error({
                message: 'Empty Fields',
                description: "Email field is empty",
            })
        }
    }
  
  return (
    <div className='loginPage'>   
        {!sentEmail ? (<div style={loginContainer}>
            <h1 style={{textAlign:'center',margin:'20px 0px',textTransform:'uppercase'}}>Forgot Password</h1>
            <div className='loginTextDescription' style={{textAlign:'center',width:'95%',margin:'10px auto'}}>
                Please enter your registered email and then click on verification link sent to your mail
            </div>
            <div style={{width:'90%',margin:'0px auto'}}>
                <Input size="large" placeholder="Email Address" prefix={<MailOutlined />} style={{padding:'10px'}} className='mBottom' onChange={(text)=> {updateUsername(text)}}/>
            </div>
            <div className='flex-container' style={{justifyContent:'center',backgroundColor:'unset'}}>
                <Button type="primary" size="large" style={{width:"200px",height:'50px',fontSize:'20px',backgroundColor:"rgb(149, 0, 255)"}} onClick={resetPassword}>Forgot Password</Button>
            </div>
            <div style={{fontSize:'18px', color:'#ffff',fontWeight:'600',color:'gray',textAlign:'center',textTransform:'uppercase'}}>Copyright © 2023 <img src='/logo-kneg.png'width='15px' alt='KNEG'/></div>
        </div>):
        (
            <div style={loginContainer}>
                <div style={{display:'flex',justifyContent:'center', alignItems:'center',width:'90%',height:'80%',margin:'auto',padding:'20px 0px',textAlign:'center'}}>The password reset link has already been sent kindy check your mail and click on the link to reset the password</div>
                <div style={{fontSize:'18px', color:'#ffff',fontWeight:'600',textTransform:'uppercase'}}>Copyright © 2023 <img src='KNEG.png'width='100px' alt='KNEG'/></div>
            </div>
            
        )}
        
    </div>
  )
}
