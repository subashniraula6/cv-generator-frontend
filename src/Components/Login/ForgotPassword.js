import React, { useState } from "react";
import { Input, notification } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useLanguage } from "../../context/Language";
import { Button } from "../../Components/Common/Button";

// import { firebaseApp } from '../Firestore/firebaseconfig';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [username, setusername] = useState("");
  const [sentEmail, setsentEmail] = useState(false);
  const loginContainer = {
    minWidth: "360px",
    maxWidth: '400px',
    padding: "15px",
    backgroundColor: "white",
    borderRadius: "15px",
  };
  let { t } = useLanguage();

  const updateUsername = (event) => {
    setusername(event.target.value);
  };

  const resetPassword = () => {
    if (username.length !== 0) {
      const auth = getAuth();
      sendPasswordResetEmail(auth, username)
        .then(() => {
          setsentEmail(true);
          notification.success({
            message: "Email sent",
            description: "Successfully sent the activation link",
          });
        })
        .catch((error) => {
          const errorCode = error.code.replace("auth/", "").replace(/-/g, " ");
          notification.error({
            message: "Invalid Email",
            description: errorCode,
          });
        });
    } else {
      notification.error({
        message: "Empty Fields",
        description: "Email field is empty",
      });
    }
  };

  return (
      <div style={loginContainer}>
        {!sentEmail ? (
          <div>
            <h1
              style={{
                textAlign: "center",
                margin: "20px 0px",
              }}
            >
              Forgot Password
            </h1>
            <div
              className="loginTextDescription"
              style={{ textAlign: "center", margin: "10px auto" }}
            >
              Please enter your registered email and then click on verification
              link sent to your mail
            </div>
            <div style={{ margin: "0px auto" }}>
              <Input
                size="large"
                placeholder="Email Address"
                prefix={<MailOutlined />}
                style={{ padding: "10px" }}
                className="mBottom"
                onChange={(text) => {
                  updateUsername(text);
                }}
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
                  height: "50px",
                  fontSize: "16px",
                  backgroundColor: "rgb(149, 0, 255)",
                }}
                onClick={resetPassword}
              >
                Forgot Password
              </Button>
            </div>
          </div>
        ) : (
          <div style={loginContainer}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "90%",
                height: "80%",
                margin: "auto",
                padding: "20px 0px",
                textAlign: "center",
              }}
            >
              The password reset link has already been sent kindy check your
              mail and click on the link to reset the password
            </div>
          </div>
        )}
        <div style={{ textAlign: 'center' }}>
          <Link to="/login" style={{ color: "unset", fontWeight: "600" }}>
            {t("signup.loginLink")}
          </Link>
          {" "}
          {" "}
          <Link to="/signup" style={{ color: "unset", fontWeight: "600" }}>
            {t("login.create")}
          </Link>
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
          <img src="logo-kneg.png" width="10px" alt="KNEG" />{" "}
        </div>
      </div>
  );
}
