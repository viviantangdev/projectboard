import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      onClick={toggleTheme}
      className='themeToggle'
      role='switch'
      aria-checked={theme === 'dark'}
      aria-label='Toggle theme'
      tabIndex={0}
    >
      {/* Sliding Knob */}
      <div
        className={`
          slidingKnob
          ${theme === 'dark' ? 'translate-x-7' : 'translate-x-0'}
        `}
      >
        {theme === 'dark' ? (
          <IoSunnyOutline
            size={18}
            className='text-white drop-shadow-sm'
          />
        ) : (
          <IoMoonOutline size={18} className='text-white drop-shadow-sm' />
        )}
      </div>
    </div>
  );
};

export default ThemeToggle;
