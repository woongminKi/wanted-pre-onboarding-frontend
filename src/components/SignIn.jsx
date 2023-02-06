import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function SignIn() {
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

  const handleSignIn = () => {
    setIsClicked(true);
    navigate("/todo");
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
        data-testid="signin-button"
        disabled={validate}
      >
        로그인
      </button>
    </>
  );
}
