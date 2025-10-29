import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <div className='flex flex-col items-center'>
        <Logo />
        <ThemeToggle />
      </div>
    </aside>
  );
};

export default Sidebar;
