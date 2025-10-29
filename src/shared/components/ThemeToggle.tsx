import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <IoSunnyOutline size={25}/> : <IoMoonOutline size={25} />}
    </button>
  );
};

export default ThemeToggle;
