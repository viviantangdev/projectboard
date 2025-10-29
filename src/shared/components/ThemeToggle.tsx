import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="gradient-btn"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <IoSunnyOutline /> : <IoMoonOutline />}
    </button>
  );
};

export default ThemeToggle;
