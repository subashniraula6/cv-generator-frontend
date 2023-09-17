import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Checkbox, Input, Modal, Spin, notification, Typography } from "antd";
import { Button } from "../Common/Button";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

import { useFirebase } from "../../context/Firebase";
import { useLanguage } from "../../context/Language";
import axios from "../../axios/axios";
import PrivacyPolicy from "../PrivacyPolicy";

const { Text } = Typography;

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
    if (!agreed) {
      notification.error({
        message: "Agreement Error",
        description: "Please view terms and conditions",
      });
      return;
    }
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
    padding: "15px",
    backgroundColor: "white",
    borderRadius: "15px",
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleCheckboxChange = (e) => {
    setAgreed(e.target.checked);
  };

  const showTermsModal = (e) => {
    e.preventDefault();
    setIsModalVisible(true);
  };

  const handleAgree = () => {
    setAgreed(true);
    setIsModalVisible(false);
  };

  // const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
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
          <div style={{ width: "90%", margin: "auto" }}>
            <Checkbox checked={agreed} disabled={!agreed}>
              I have read and agree to the{" "}
              <Button onClick={showTermsModal}>Terms and Conditions</Button>
            </Checkbox>
          </div>
          <Modal
            title="Terms and Conditions"
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            width={"50rem"}
          >
            <PrivacyPolicy />
            <Button
              type="primary"
              onClick={handleAgree}
              style={{ marginTop: "15px" }}
            >
              Agree
            </Button>
          </Modal>
          <div
            className="flex-container"
            style={{
              justifyContent: "center",
              backgroundColor: "unset",
            }}
          >
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
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
            margin: "10px",
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
  );
}
