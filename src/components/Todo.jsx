import React from "react";
import { useNavigate } from "react-router";

export default function Todo() {
  const navigate = useNavigate();

  if (!localStorage.getItem("accessToken")) {
    navigate("/signin");
  }

  return <div>Todo</div>;
}
