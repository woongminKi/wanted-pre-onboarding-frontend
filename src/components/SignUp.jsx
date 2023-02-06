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
  console.log("email:", email, typeof email);
  console.log("passWord:", passWord, typeof passWord);

  const handleSignIn = () => {
    async function fetchSignUp() {
      try {
        const response = await axios.post(
          "https://pre-onboarding-selection-task.shop/auth/signup",
          {
            headers: {
              "Content-Type": `application/json`,
            },
            body: {
              email,
              password: passWord,
            },
          }
        );
        console.log("response::", response);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSignUp();
    setIsClicked(true);
  };

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
        onClick={handleSignIn}
        data-testid="signup-button"
        disabled={validate}
      >
        회원가입
      </button>
    </>
  );
}
