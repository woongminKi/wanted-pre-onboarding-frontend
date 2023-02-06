import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Todo() {
  const navigate = useNavigate();
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const accessToken = `Bearer ${localStorage.getItem("accessToken")}`;

  if (!localStorage.getItem("accessToken")) {
    navigate("/signin");
  }

  const getTodoList = () => {
    async function fetchTodoList() {
      try {
        const response = await axios.get(
          "https://pre-onboarding-selection-task.shop/todos",
          {
            headers: { Authorization: accessToken },
          }
        );

        setTodoList(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchTodoList();
  };

  const addTodoList = () => {
    async function postTodoList() {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: accessToken,
        };
        const data = {
          todo,
        };

        await axios.post(
          "https://pre-onboarding-selection-task.shop/todos",
          { todo: data.todo },
          {
            headers,
          }
        );
      } catch (err) {
        console.error(err);
      }
    }

    postTodoList();
  };

  const handleTodo = (e) => {
    setTodo(e.target.value);
  };

  useEffect(() => {
    getTodoList();
  }, [todoList]);

  return (
    <>
      <h1>To Do List</h1>
      <input onChange={handleTodo} data-testid="new-todo-input" />
      <button onClick={addTodoList} data-testid="new-todo-add-button">
        추가
      </button>

      {todoList.map((item) => {
        return (
          <li key={item.id}>
            <label>
              <input type="checkbox" />
              <span>{item.todo}</span>
            </label>
            <button data-testid="modify-button">수정</button>
            <button data-testid="delete-button">삭제</button>
          </li>
        );
      })}
    </>
  );
}
