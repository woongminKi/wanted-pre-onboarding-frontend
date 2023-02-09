import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

export default function Home() {
  const navigate = useNavigate();

  if (!localStorage.getItem("accessToken")) {
    navigate("/signin");
  }

  const handleGoSignUp = () => {
    navigate("/signup");
  };

  const handleGoSignIn = () => {
    navigate("/signin");
  };

  return (
    <Container>
      <h1>Wanted Free Onboarding</h1>
      <Div>프리 온보딩 FE 인턴쉽에 지원하는 기웅민입니다</Div>
      <Button className="signup-button" onClick={handleGoSignUp}>
        회원 가입
      </Button>
      <Button className="login-button" onClick={handleGoSignIn}>
        로그인
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
  .login-button:hover {
    padding: 20px 45px 20px 45px;
    transition: all 0.2s linear 0s;
  }
`;

const Div = styled.div`
  margin-bottom: 20px;
  color: #6e6e6e;
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
