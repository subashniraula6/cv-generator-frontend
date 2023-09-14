import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Spin, notification } from "antd";
import { Button } from "../Common/Button";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

import { useFirebase } from "../../context/Firebase";
import { useLanguage } from "../../context/Language";
import axios from "../../axios/axios";

export default function Signup() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useFirebase();

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

  const [acknowledgmentChecked, setAcknowledgmentChecked] = useState(false);

  const handleAcknowledgmentChange = (e) => {
    setAcknowledgmentChecked(e.target.checked);
  };

  const createUser = async (body) => {
    let response = await axios.post("signup", JSON.stringify(body));
    return response.data;
  };

  const signUpEmailPass = (e) => {
    e.preventDefault();
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
    }
    if (!acknowledgmentChecked) {
      notification.error({
        message: "Signup Error",
        description: "Please acknowledge the terms and conditions.",
      });
      return;
    } else {
      setIsLoading(true);
      createUser({ email, password })
        .then(({ response }) => {
          if (response.status == "Error") {
            notification.error({
              message: "Signup Error",
              description: response.message,
            });
            setIsLoading(false);
          } else if (response.status == "Success") {
            notification.success({
              message: response.message,
            });
            navigate("/login");
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  };

  const loginContainer = {
    width: "500px",
    padding: "20px",
    backgroundColor: "rgb(149, 0, 255, 0.07)",
    borderRadius: "15px",
  };
  // const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <div className="signup-page">
      <div style={loginContainer}>
        <Spin spinning={isLoading}>
          <h1 style={{ textAlign: "center", margin: "20px 0px" }}>
            {t("signup.title")}
          </h1>
          <div
            className="loginTextDescription"
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            {t("signup.info")}
          </div>
          <form onSubmit={signUpEmailPass}>
            <div style={{ display: "flex", width: "90%", margin: "0px auto" }}>
              <Input
                size="large"
                placeholder={t("placeholder.firstName")}
                prefix={<UserOutlined />}
                style={{ padding: "10px", marginRight: "5px" }}
                className="mBottom"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={handleChange}
              />
              <Input
                size="large"
                placeholder={t("placeholder.lastName")}
                prefix={<></>}
                style={{ padding: "10px" }}
                className="mBottom"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={handleChange}
              />
            </div>
            <div style={{ width: "90%", margin: "5px auto" }}>
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
              />
            </div>
            <div style={{ width: "90%", margin: "5px auto" }}>
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
            <div style={{ width: "90%", margin: "5px auto 20px auto" }}>
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
              style={{ width: "90%", margin: "0 auto", padding: "0px 10px" }}
            >
              <input
                type="checkbox"
                id="acknowledgementTOC"
                checked={acknowledgmentChecked}
                onChange={handleAcknowledgmentChange}
              />
              {"  "} I agree all the terms and condition
            </div>
            <div
              className="flex-container"
              style={{
                justifyContent: "center",
                backgroundColor: "unset",
              }}
            >
              <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                {t("button.signup")}
              </Button>
            </div>
          </form>
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
            {t("footer.copyright")} © 2023{" "}
            <img src="logo-kneg.png" width="10px" alt="KNEG" />
          </div>
        </Spin>
      </div>
    </div>
  );
}
