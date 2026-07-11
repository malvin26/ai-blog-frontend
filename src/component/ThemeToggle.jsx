import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        flex
        items-center
        justify-center
        w-10
        h-10
        rounded-lg
        border
        border-gray-300
        dark:border-gray-700
        hover:bg-gray-100
        dark:hover:bg-gray-800
        transition
      "
    >
      {theme === "dark" ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
    </button>
  );
};

export default ThemeToggle;