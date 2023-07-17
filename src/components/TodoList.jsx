import "./todoList.css";
import JobTile from "./JobTile";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TodoList({ themeChange, theme }) {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [countLeft, setCountLeft] = useState(0);

  //get all tasks on initial run
  useEffect(() => {
    axios.get("http://localhost:5000/").then((response) => {
      setTodos(response.data);
      //console.log(response.data);
    });
  }, []);

  //new task input
  function handleInput(event) {
    setNewTask(event.target.value);
  }

  //upload the new task to database and then fetch the whole list for id consistency
  function handleCreate(event) {
    if (event.code === "Enter") {
      axios
        .post("http://localhost:5000/add", {
          completionStatus: false,
          task: newTask,
        })
        .then(() =>
          axios.get("http://localhost:5000/").then((response) => {
            setTodos(response.data);
          })
        );

      setNewTask("");
    }
  }

  //update the task status
  function handleOnCompletion(index) {
    axios.post("http://localhost:5000/update/" + index, {
      completionStatus: true,
    });
    setTodos((prev) =>
      prev.map((item) =>
        item._id == index
          ? {
              _id: index,
              completionStatus: true,
              task: item.task,
            }
          : item
      )
    );
  }

  //delete any task as user wants
  function handleOnDeletion(index) {
    axios.delete("http://localhost:5000/delete/" + index);
    setTodos((prev) => prev.filter((item) => item._id != index));
  }

  //show active task count
  function handleLeftCount(event) {
    axios.get("http://localhost:5000/").then((response) => {
      setCountLeft((prev) => {
        var temp = 0;
        response.data.map((i) => !i.completionStatus && temp++);
        return temp;
      });
    });
  }

  //display all tasks from database
  function handleDisplayAll(event) {
    axios.get("http://localhost:5000/").then((response) => {
      setTodos(response.data);
    });
  }

  //display active tasks
  function handleDisplayActive(event) {
    axios.get("http://localhost:5000/").then((response) => {
      setTodos(response.data.filter((i) => !i.completionStatus));
    });
  }

  //display completed tasks which has not been deleted
  function handleDisplayCompleted(event) {
    axios.get("http://localhost:5000/").then((response) => {
      setTodos(response.data.filter((i) => i.completionStatus));
    });
  }

  //delete all completed tasks
  function handleDeleteCompleted(event) {
    todos.map(
      (i) =>
        i.completionStatus &&
        axios.delete("http://localhost:5000/delete/" + i._id)
    );
    setTodos((prev) => prev.filter((i) => !i.completionStatus));
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
          style={{
            backgroundColor: theme ? "" : "hsl(236, 33%, 92%)",
            color: theme ? "" : "hsl(235, 19%, 35%)",
          }}
        />
      </div>
      <div
        className="todo-lists"
        style={{
          backgroundColor: theme ? "" : "hsl(236, 33%, 92%)",
        }}
      >
        {todos.length > 0 ? (
          todos.map((item) => {
            return (
              <JobTile
                key={item._id}
                id={item._id}
                completionStatus={item.completionStatus}
                task={item.task}
                handleCompletion={handleOnCompletion}
                handleOnDeletion={handleOnDeletion}
                theme={theme}
              />
            );
          })
        ) : (
          <p>No tasks yet, add new task</p>
        )}
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
