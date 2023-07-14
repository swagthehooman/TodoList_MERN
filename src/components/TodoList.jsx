import "./todoList.css";
import todoList from "../../demoData";
import JobTile from "./JobTile";
import { useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState(todoList.list);
  const [newTask, setNewTask] = useState("");

  function handleInput(event) {
    setNewTask(event.target.value);
  }

  function handleCreate(event) {
    if (event.code === "Enter") {
      setTodos((prev) => {
        return prev.concat({ completionStatus: false, task: newTask });
      });
      setNewTask("");
      console.log(todos);
    }
  }

  function handleOnCompletion(event) {}

  function handleOnDeletion(event) {}

  function buildList(data, completionClick) {
    return (
      <JobTile
        key={data.task}
        completionStatus={data.completionStatus}
        task={data.task}
        handleCompletion={completionClick}
      />
    );
  }

  return (
    <div className="todo-list-container">
      <div className="heading">
        <p className="logo">TODO</p>
        <button className="theme-button">
          <img src="./images/icon-sun.svg" />
        </button>
      </div>
      <div className="task-input-box">
        <input
          type="text"
          onChange={handleInput}
          name="newTask"
          value={newTask}
          onKeyDown={handleCreate}
        />
      </div>
      <div className="todo-lists">
        {todos.map((i) => buildList(i, handleOnCompletion, handleOnDeletion))}
        <div className="options-bar">
          <button>items left</button>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
          <button>Clear Completed</button>
        </div>
      </div>
    </div>
  );
}
