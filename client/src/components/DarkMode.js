import { MdDarkMode } from "react-icons/md";
const { useState, useEffect } = require("react");

const DarkMode = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleDark = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <div>
      <MdDarkMode
        onClick={toggleDark}
        className="text-black dark:text-white w-[25px] h-[25px]"
      ></MdDarkMode>
    </div>
  );
};

export default DarkMode;
