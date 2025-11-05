import { NavLink } from 'react-router';
import { navigations } from '../utils/routes';
import Logo from '../components/Logo';
import ThemeToggle from '../components/ThemeToggle';

const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <div className='flex flex-col gap-7 h-full'>
        <Logo />

        <nav className='flex flex-col gap-2 flex-1'>
          {navigations.map((nav, index) => (
            <NavLink
              key={index}
              to={nav.path!}
              className={({ isActive }) =>
                `navlink ${isActive && 'navlinkActive'}`
              }
            >
              {nav.name}
            </NavLink>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </aside>
  );
};

export default Sidebar;
