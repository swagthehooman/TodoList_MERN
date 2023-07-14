import "./app.css";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <div className="body-section">
      <picture className="bg-picture">
        <img src="./images/bg-desktop-dark.jpg" />
      </picture>
      <main>
        <TodoList />
      </main>
    </div>
  );
}
