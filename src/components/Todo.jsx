import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Todo() {
  const navigate = useNavigate();
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editButtonClick, setEditButtonClick] = useState(false);
  const [editTargetId, setEditTargetId] = useState(null);
  const [checkCompleted, setCheckCompleted] = useState(false);
  const [cancelButtonClick, setCancelButtonClick] = useState(false);
  const accessToken = `Bearer ${localStorage.getItem("accessToken")}`;

  if (!localStorage.getItem("accessToken")) {
    navigate("/signin");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: accessToken,
  };

  const updateTodoList = (id, isCompleted, todo) => {
    async function updateTodoListData() {
      try {
        const data = {
          todo,
          isCompleted,
        };

        await axios.put(
          `https://pre-onboarding-selection-task.shop/todos/${id}`,
          { todo: data.todo, isCompleted: data.isCompleted },
          {
            headers,
          }
        );
      } catch (err) {
        console.error(err);
      }
    }

    updateTodoListData();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const editTodoList = (e) => {
    setEditTargetId(e.target.value);
    setEditButtonClick(true);
    setCancelButtonClick(false);
  };

  const deleteTodoList = (e) => {
    const targetId = e.target.value;

    async function removeTodoList() {
      try {
        await axios.delete(
          `https://pre-onboarding-selection-task.shop/todos/${targetId}`,
          {
            headers,
          }
        );
      } catch (err) {
        console.error(err);
      }
    }
    removeTodoList();
  };

  const handleTodo = (e) => {
    setTodo(e.target.value);
  };

  const handleEditTodo = (e) => {
    setTodo(e.target.value);
  };

  const handleUpdateButton = (e) => {
    const targetId = e.target.value;
    let todoValue = "";

    todoList.forEach((element) => {
      if (element.id === Number(targetId)) {
        todoValue = todo;
      }
    });

    updateTodoList(targetId, checkCompleted, todoValue);
    window.location.reload();
  };

  const handleCheckButton = (e) => {
    const targetId = e.target.value;
    const isCompleted = e.target.checked;
    let todoValue = "";

    todoList.forEach((element) => {
      if (element.id === Number(targetId)) {
        todoValue = element.todo;
      }
    });

    setCheckCompleted(e.target.checked);
    updateTodoList(targetId, isCompleted, todoValue);
  };

  const handleCancelButton = () => {
    setCancelButtonClick(true);
  };

  useEffect(() => {
    getTodoList();
  }, [getTodoList]);

  return (
    <>
      <h1>To Do List</h1>
      <input onChange={handleTodo} data-testid="new-todo-input" />
      <button onClick={addTodoList} data-testid="new-todo-add-button">
        추가
      </button>

      {todoList.map((item) => {
        return (
          <>
            {!editButtonClick ? (
              <li key={item.id}>
                <label>
                  <input
                    value={item.id}
                    onClick={(e) => handleCheckButton(e)}
                    type="checkbox"
                  />
                  <span>{item.todo}</span>
                </label>
                <button
                  value={item.id}
                  onClick={(e) => editTodoList(e)}
                  data-testid="modify-button"
                >
                  수정
                </button>
                <button
                  value={item.id}
                  onClick={(e) => deleteTodoList(e)}
                  data-testid="delete-button"
                >
                  삭제
                </button>
              </li>
            ) : (
              <>
                {item.id === Number(editTargetId) && !cancelButtonClick ? (
                  <li key={item.id}>
                    <label>
                      <input
                        value={item.id}
                        onClick={(e) => handleCheckButton(e)}
                        type="checkbox"
                      />
                      <input
                        defaultValue={item.todo}
                        onChange={handleEditTodo}
                        type="text"
                      />
                    </label>
                    <button
                      value={item.id}
                      onClick={(e) => handleUpdateButton(e)}
                      data-testid="submit-button"
                    >
                      제출
                    </button>
                    <button
                      onClick={handleCancelButton}
                      data-testid="cancel-button"
                    >
                      취소
                    </button>
                  </li>
                ) : (
                  <li key={item.id}>
                    <label>
                      <input
                        value={item.id}
                        onClick={(e) => handleCheckButton(e)}
                        type="checkbox"
                      />
                      <span>{item.todo}</span>
                    </label>
                    <button
                      value={item.id}
                      onClick={(e) => editTodoList(e)}
                      data-testid="modify-button"
                    >
                      수정
                    </button>
                    <button
                      value={item.id}
                      onClick={deleteTodoList}
                      data-testid="delete-button"
                    >
                      삭제
                    </button>
                  </li>
                )}
              </>
            )}
          </>
        );
      })}
    </>
  );
}
