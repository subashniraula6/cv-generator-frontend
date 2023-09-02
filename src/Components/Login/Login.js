import React, { useState, useEffect } from "react";
import { GoogleOutlined, UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Input } from "antd";
import { Button } from '../Common/Button';
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { removeLocalUserProfiles } from '../../utils'
import { useFirebase } from '../../context/Firebase'
import { useLanguage } from '../../context/Language'

export default function Login() {
  // const tokenExist = CheckAuth();
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  let {user, signinUserWithEmailAndPassword, loginWithGoogle} = useFirebase();
  let {t} = useLanguage();

  useEffect(()=> {
    if(user) {
      navigate('/app');
    }
  }, [user])

  const updateUsername = (event) => {
    setusername(event.target.value);
  };
  const updatePassword = (event) => {
    setpassword(event.target.value);
  };

  const userLogin = () => {
    if (username.length !== 0 && password.length !== 0) {
      signinUserWithEmailAndPassword(username, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          const authToken = user.accessToken;
          localStorage.setItem("authToken", authToken);

          // removed previous localstorages
          removeLocalUserProfiles();

          notification.success({
            message: "Login Success",
            description: "Successfully Logged in please wait",
          });
          navigate("/app");
        })
        .catch((error) => {
          const errorCode = error.code.replace("auth/", "").replace(/-/g, " ");
          // const errorMessage = error.message;
          notification.error({
            message: "Login Error",
            description: errorCode,
          });
        });
    } else {
      notification.error({
        message: "Login Error",
        description: "Email or Password field is empty",
      });
    }
  };

  async function signInWithGoogle() {
    try {
      const result = await loginWithGoogle();
      navigate("/app");
    } catch (error) {
      console.log(error)
      const errorCode = error.code.replace("auth/", "").replace(/-/g, " ");
      notification.error({
        message: "Google Sign-In Error",
        description: errorCode,
      });
    }
  }

  // const [passwordVisible, setPasswordVisible] = React.useState(false);

  const loginContainer = {
    height: "450px",
    width: "500px",
    backgroundColor: "#f0f0f0",
    borderRadius: "15px",
  };

  return (
    <div className="loginPage">
      <div style={loginContainer}>
        <h1
          style={{
            textAlign: "center",
            margin: "20px 0px",
            textTransform: "uppercase",
          }}
        >
          {t("login.title")}
        </h1>
        <div
          className="loginTextDescription"
          style={{ textAlign: "center", marginBottom: "10px" }}
        >
          {t("login.info")}
        </div>
        <div style={{ width: "90%", margin: "0px auto" }}>
          <Input
            size="large"
            type="email"
            placeholder={t("placeholder.email")}
            prefix={<UserOutlined />}
            style={{ padding: "10px" }}
            className="mBottom"
            onChange={(text) => {
              updateUsername(text);
            }}
          />
        </div>
        <div style={{ width: "90%", margin: "0px auto", position: "relative" }}>
          <Input.Password
            size="large"
            placeholder={t("placeholder.password")}
            // status='error'
            // prefix={<ClockCircleOutlined/>}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            style={{ padding: "10px" }}
            className="mBottom"
            onChange={(text) => {
              updatePassword(text);
            }}
            required
          />
          <div
            style={{ position: "absolute", right: "0px", cursor: "pointer" }}
          >
            <Link
              to="/forgot-password"
              style={{ color: "unset", fontWeight: "600" }}
            >
              {t("login.forgotPassword")}
            </Link>
          </div>
        </div>
        <div
          className="flex-container"
          style={{
            justifyContent: "center",
            backgroundColor: "unset",
            marginTop: "20px",
          }}
        >
          <Button
            type="primary"
            style={{
              width: "100%",
            }}
            onClick={userLogin}
          >
            {t("button.login")}
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "unset",
          }}
        >
          <Button
            type="warning"
            onClick={signInWithGoogle}
          >
            <GoogleOutlined /> {t("button.signinwithgoogle")}
          </Button>
        </div>
        <div style={{ textAlign: "center", marginTop: "15px" }}>
        {t("login.signup")}{" "}
          <span style={{ fontStyle: "italic", cursor: "pointer" }}>
            <Link to="/signup" style={{ color: "unset", fontWeight: "600" }}>
            {t("login.create")}
            </Link>
          </span>
        </div>
      <div
        style={{
          fontSize: "14px",
          color: "grey",
          margin: "20px",
          fontWeight: "600",
          textTransform: "uppercase",
          textAlign: 'center'
        }}
      >
        {t("footer.copyright")} © 2023 <img src="logo-kneg.png" width="10px" alt="KNEG" />{" "}
      </div>
      </div>
    </div>
  );
}
