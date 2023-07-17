import { useState } from "react";
import "./app.css";
import TodoList from "./components/TodoList";

export default function App() {
  //true for dark mode, false for light
  const [theme, setTheme] = useState(true);

  function handleThemeChange(event) {
    setTheme((prev) => !prev);
  }

  return (
    <div
      className="body-section"
      style={{ backgroundColor: theme ? "" : "hsl(0, 0%, 98%)" }}
    >
      <picture className="bg-picture">
        <source
          srcSet={
            theme
              ? "./images/bg-mobile-dark.jpg"
              : "./images/bg-mobile-light.jpg"
          }
          media="(max-width:800px)"
        />
        <img
          src={
            theme
              ? "./images/bg-desktop-dark.jpg"
              : "./images/bg-desktop-light.jpg"
          }
        />
      </picture>
      <main>
        <TodoList themeChange={handleThemeChange} theme={theme} />
      </main>
    </div>
  );
}
