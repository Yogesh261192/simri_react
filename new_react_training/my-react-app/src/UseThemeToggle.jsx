import { useTheme } from "./components/ThemeContext";

export default function ThemeToggle(){
    const { darkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Switch to {darkMode ? "Light" : "Dark"} Mode
    </button>
  );
}