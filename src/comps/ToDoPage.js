import React, { useState, useEffect } from "react";
import "../App.css";

function ToDoPage({ setUserLoggedIn }) {
  const baseURL = process.env.REACT_APP_BASE_URL_TO_FETCH;
  const [todoToAdd, setTodoToAdd] = useState(``);
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = async () => {
    setLoading(true);
    await fetch(`${baseURL}/get_all_todos`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userid: localStorage.getItem("userid"),
        accesstoken: localStorage.getItem("accesstoken"),
      }),
    })
      .then((res) => res.json())
      .then((item) => {
        setPendingTodos(item.pendingTodos);
        setCompletedTodos(item.completedTodos);
      });
    setLoading(false);
  };

  const addToDo = async () => {
    setLoading(true);
    await fetch(`${baseURL}/add_todo`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userid: localStorage.getItem("userid"),
        accesstoken: localStorage.getItem("accesstoken"),
        todo: todoToAdd,
      }),
    })
      .then((res) => res.json())
      .then((item) => {
        console.log(item.msg);
        setTodoToAdd(``);
        getAllTodos();
      });
    setLoading(false);
  };

  const markAsCompleted = async (todoid) => {
    setLoading(true);
    await fetch(`${baseURL}/mark_as_completed`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userid: localStorage.getItem("userid"),
        accesstoken: localStorage.getItem("accesstoken"),
        todoid: todoid,
      }),
    })
      .then((res) => res.json())
      .then((item) => {
        getAllTodos();
      });
    setLoading(true);
  };

  const logOut = () => {
    localStorage.clear();
    setUserLoggedIn(false);
  };

  return (
    <>
      {loading ? (
        <div>
          <h2>Loading...</h2>
        </div>
      ) : (
        <div className="todo_page_container">
          <button onClick={logOut}>LOG OUT</button>
          <div className="todo_page_adder_section">
            <h1>Add To Do Here</h1>
            <textarea
            rows={5}
              placeholder="Type the todo here..."
              value={todoToAdd}
              onChange={(e) => setTodoToAdd(e.target.value)}
            ></textarea>
            <button onClick={addToDo}>ADD</button>
          </div>

          <div className="todos_container">
            {pendingTodos.map((item) => (
              <div key={item.todoid} className="todos_item">
                <div>
                  <h3>{item.todo}</h3>
                  <p>{new Date(item.timestamp).toLocaleDateString()}</p>
                </div>
                <div>
                  <button
                    value={item.todoid}
                    onClick={(e) => markAsCompleted(e.target.value)}
                  >
                    Complete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="todos_container">
            {completedTodos.map((item) => (
              <div key={item.todoid} className="todos_item_completed">
                <div>
                  <h3>{item.todo}</h3>
                  <p>{new Date(item.timestamp).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ToDoPage;
