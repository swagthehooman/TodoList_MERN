import "./todoList.css";
import todoList from "../../demoData";
import JobTile from "./JobTile";
import { useState } from "react";

export default function TodoList({ themeChange, theme }) {
  const [todos, setTodos] = useState(todoList.list);
  const [newTask, setNewTask] = useState("");
  const [countLeft, setCountLeft] = useState(0);

  function handleInput(event) {
    setNewTask(event.target.value);
  }

  function handleCreate(event) {
    if (event.code === "Enter") {
      setTodos((prev) => {
        return prev.concat({
          id: prev[prev.length - 1].id + 1,
          completionStatus: false,
          task: newTask,
        });
      });
      setNewTask("");
      console.log(todos);
    }
  }

  function handleOnCompletion(index) {
    setTodos((prev) =>
      prev.map((item) =>
        item.id == index
          ? {
              id: index,
              completionStatus: !item.completionStatus,
              task: item.task,
            }
          : item
      )
    );
  }

  function handleOnDeletion(index) {
    setTodos((prev) => prev.filter((item) => item.id != index));
  }

  function handleLeftCount(event) {
    setCountLeft((prev) => {
      var temp = 0;
      todos.map((i) => !i.completionStatus && temp++);
      return temp;
    });
  }

  function handleDisplayAll(event) {
    setTodos(todoList.list);
  }

  function handleDisplayActive(event) {
    setTodos(todoList.list.filter((i) => i.completionStatus));
  }

  function handleDisplayCompleted(event) {
    setTodos(todoList.list.filter((i) => i.completionStatus));
  }

  function handleDeleteCompleted(event) {
    setTodos(todoList.list.filter((i) => !i.completionStatus));
  }

  return (
    <div className="todo-list-container">
      <div className="heading">
        <p className="logo">TODO</p>
        <button className="theme-button" onClick={themeChange}>
          <img
            src={theme ? "./images/icon-sun.svg" : "./images/icon-moon.svg"}
          />
        </button>
      </div>
      <div className="task-input-box">
        <input
          type="text"
          onChange={handleInput}
          name="newTask"
          value={newTask}
          onKeyDown={handleCreate}
          style={{ backgroundColor: theme ? "" : "hsl(236, 33%, 92%)" }}
        />
      </div>
      <div
        className="todo-lists"
        style={{ backgroundColor: theme ? "" : "hsl(236, 33%, 92%)" }}
      >
        {todos.map((item) => {
          return (
            <JobTile
              key={item.id}
              id={item.id}
              completionStatus={item.completionStatus}
              task={item.task}
              handleCompletion={handleOnCompletion}
              handleOnDeletion={handleOnDeletion}
              theme={theme}
            />
          );
        })}
        <div
          className={
            theme
              ? "options-bar options-bar-dark"
              : "options-bar options-bar-light"
          }
        >
          <button onClick={handleLeftCount}>
            {countLeft == 0 ? "" : countLeft.toString() + " "}items left
          </button>
          <button onClick={handleDisplayAll}>All</button>
          <button onClick={handleDisplayActive}>Active</button>
          <button onClick={handleDisplayCompleted}>Completed</button>
          <button onClick={handleDeleteCompleted}>Clear Completed</button>
        </div>
      </div>
    </div>
  );
}
