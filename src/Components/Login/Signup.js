import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, notification } from "antd";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

import { useFirebase } from "../../context/Firebase";
import { useLanguage } from "../../context/Language";
import questions from '../../Questions2';

export default function Signup() {
  const navigate = useNavigate();
  const {t} = useLanguage();

  const { signupUserWithEmailAndPassword, putData, user } = useFirebase();

  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user]);

  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const { firstName, lastName, email, password, cPassword } = formData;

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const signUpEmailPass = () => {
    if (!email) {
      notification.error({
        message: "Signup Error",
        description: "Email is empty",
      });
      return;
    }
    if (!firstName) {
      notification.error({
        message: "Signup Error",
        description: "First Name is empty",
      });
      return;
    }
    if (!lastName) {
      notification.error({
        message: "Signup Error",
        description: "Last Name is empty",
      });
      return;
    }
    if (password !== cPassword) {
      notification.error({
        message: "Signup Error",
        description: "Password doesn't match",
      });
      return;
    } else {
      signupUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          //   const authToken = userCredential.user.accessToken;
          //   localStorage.setItem("authToken", authToken);
          return putData('users', { email: userCredential.user.email, firstName, lastName, questions })
        })
        .then(data => {
          notification.success({
            message: "Signup Success",
            description: "Successfully created an account and logged in",
          });  
        })
        .catch((error) => {
          // const errorCode = error.code;
          console.log(error)
          const errorCode = error.code.replace("auth/", "").replace(/-/g, " ");
          notification.error({
            message: "Signup Error",
            description: errorCode,
          });
        });
    }
  };

  const loginContainer = {
    height: "500px",
    width: "500px",
    backgroundColor: "#f0f0f0",
    borderRadius: "15px",
  };
  // const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <div className="signup-page">
      <div style={loginContainer}>
        <h1 style={{ textAlign: "center", margin: "20px 0px" }}>
        {t("signup.title")}
        </h1>
        <div
          className="loginTextDescription"
          style={{ textAlign: "center", marginBottom: "10px" }}
        >
          {t("signup.info")}
        </div>
        <div style={{ display: "flex", width: "90%", margin: "0px auto" }}>
          <Input
            size="large"
            placeholder={t("placeholder.firstName")}
            prefix={<UserOutlined />}
            style={{ padding: "10px", marginRight: "2px" }}
            className="mBottom"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            required
          />
          <Input
            size="large"
            placeholder={t("placeholder.lastName")}
            style={{ padding: "10px" }}
            className="mBottom"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ width: "90%", margin: "0px auto" }}>
          <Input
            size="large"
            placeholder={t("placeholder.email")}
            type="email"
            prefix={<MailOutlined />}
            style={{ padding: "10px" }}
            className="mBottom"
            id="emailAddress"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ width: "90%", margin: "0px auto" }}>
          <Input.Password
            size="large"
            placeholder={t("placeholder.password")}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            style={{ padding: "10px" }}
            className="mBottom"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div style={{ width: "90%", margin: "0px auto" }}>
          <Input.Password
            size="large"
            status={password !== cPassword ? "error" : ""}
            placeholder={t("placeholder.cPassword")}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            style={{ padding: "10px" }}
            className="mBottom"
            name="cPassword"
            value={cPassword}
            onChange={handleChange}
          />
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
            size="large"
            style={{
              width: "200px",
              height: "50px",
              fontSize: "20px",
              backgroundColor: "rgb(149, 0, 255)",
            }}
            onClick={signUpEmailPass}
          >
            {t("button.signup")}
          </Button>
        </div>
        <div style={{ textAlign: "center" }}>
        {t("signup.logininfo")}{" "}
          <span style={{ fontStyle: "italic", cursor: "pointer" }}>
            <Link to="/login" style={{ color: "unset", fontWeight: "600" }}>
            {t("signup.loginLink")}
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
            textAlign: "center",
          }}
        >
          {t("footer.copyright")} © 2023 <img src="logo-kneg.png" width="10px" alt="KNEG" />
        </div>
      </div>
    </div>
  );
}
