import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import styled from "styled-components";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
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
    navigate("/signin");
  };

  useEffect(() => {
    if (email.includes("@") && passWord.length >= 8) {
      setValidate(false);
    }
  }, [email, passWord]);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/todo");
    }
  }, []);

  return (
    <Container>
      <h1>회원 가입</h1>
      <div>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          data-testid="email-input"
          placeholder="email"
        />
      </div>
      <div>
        <Input
          type="password"
          id="pw"
          value={passWord}
          onChange={handlePWChange}
          data-testid="password-input"
          placeholder="비밀 번호"
        />
      </div>
      <Button
        className="signup-button"
        onClick={handleSignUp}
        data-testid="signup-button"
        disabled={validate}
      >
        회원가입
      </Button>
    </Container>
  );
}

const Container = styled.div`
  padding: 200px 0;
  text-align: center;

  .signup-button:hover {
    padding: 20px 45px 20px 45px;
    transition: all 0.2s linear 0s;
  }
`;

const Input = styled.input`
  margin-bottom: 10px;
  border: 1px solid lightgray;
  border-radius: 8px;
  width: 200px;
  height: 30px;
`;

const Button = styled.button`
  margin-right: 15px;
  padding: 15px 40px 15px 40px;
  border: none;
  border-radius: 8px;
  background: #3366ff;
  color: white;
  cursor: pointer;
`;
