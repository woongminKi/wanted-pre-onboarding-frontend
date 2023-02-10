import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import styled from "styled-components";

export default function SignIn() {
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

  const handleSignIn = () => {
    async function fetchSignIn() {
      try {
        const response = await axios.post(
          "https://pre-onboarding-selection-task.shop/auth/signin",
          {
            headers: {
              "Content-Type": "application/json",
            },
            email,
            password: passWord,
          }
        );

        localStorage.setItem("accessToken", response.data.access_token);
      } catch (err) {
        console.error(err);
      }
    }

    fetchSignIn();
    navigate("/todo");
  };

  useEffect(() => {
    if (email.includes("@") && passWord.length >= 8) {
      setValidate(false);
    } else {
      setValidate(true);
    }
  }, [email, passWord]);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/todo");
    }
  }, []);

  return (
    <Container>
      <h1>로그인</h1>
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
        className="login-button"
        onClick={handleSignIn}
        data-testid="signin-button"
        disabled={validate}
      >
        로그인
      </Button>
    </Container>
  );
}

const Container = styled.div`
  padding: 200px 0;
  text-align: center;

  .login-button:hover {
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
  background: ${(props) => (props.disabled ? "#3399ff" : "#3366ff")};
  color: white;
  cursor: pointer;
`;
