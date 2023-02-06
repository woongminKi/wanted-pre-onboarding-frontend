import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [validate, setValidate] = useState(true);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePWChange = (e) => {
    setPassWord(e.target.value);
  };

  const handleSignUp = () => {
    async function fetchSignUp() {
      try {
        await axios.post(
          "https://pre-onboarding-selection-task.shop/auth/signup",
          {
            headers: {
              "Content-Type": "application/json",
            },
            email,
            password: passWord,
          }
        );
      } catch (err) {
        console.error(err);
      }
    }

    fetchSignUp();
    setIsClicked(true);
    navigate("/signin");
  };

  if (localStorage.getItem("accessToken")) {
    navigate("/todo");
  }

  useEffect(() => {
    if (email.includes("@") && passWord.length >= 8) {
      setValidate(false);
    }
  }, [email, passWord]);

  return (
    <>
      <h1>로그인</h1>
      <input
        type="email"
        id="email"
        pattern=".+@gmail\.com"
        value={email}
        onChange={handleEmailChange}
        data-testid="email-input"
        placeholder="email"
      />
      <input
        type="password"
        id="pw"
        value={passWord}
        onChange={handlePWChange}
        data-testid="password-input"
        placeholder="비밀 번호"
      />
      <button
        id="login-button"
        onClick={handleSignUp}
        data-testid="signup-button"
        disabled={validate}
      >
        회원가입
      </button>
    </>
  );
}
