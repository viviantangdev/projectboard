import { useState } from 'react';
import { GoChevronDown } from 'react-icons/go';
import { NavLink } from 'react-router';
import Logo from '../components/Logo';
import ThemeToggle from '../components/ThemeToggle';
import { useNavigations } from '../hooks/useNavigations';

const Sidebar = () => {
  const navigations = useNavigations();
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  return (
    <aside className='sidebar'>
      <div className='flex flex-col gap-7 h-full'>
        <Logo />
        <nav className='flex flex-col gap-2 flex-1'>
          {navigations.map((nav, index) => (
            <div key={index} className='flex flex-col gap-1'>
              {nav.children && nav.children.length > 0 ? (
                <>
                  <button
                    onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                    className='navlink flex justify-between items-center'
                  >
                    {nav.name}
                    <span
                 className={`transition-transform duration-300 ${isProjectsOpen ? 'rotate-180' : 'rotate-0'}`}
                    >
                      <GoChevronDown />
                    </span>
                  </button>
                  {isProjectsOpen && (
                    <div className='ml-4 flex flex-col gap-1'>
                      {nav.children.map((child, childIndex) => (
                        <NavLink
                          key={childIndex}
                          to={child.path}
                          className={({ isActive }) =>
                            `navlink child-navlink ${
                              isActive ? 'navlinkActive' : ''
                            }`
                          }
                        >
                          {child.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to={nav.path}
                  className={({ isActive }) =>
                    `navlink ${isActive ? 'navlinkActive' : ''}`
                  }
                >
                  {nav.name}
                </NavLink>
              )}
            </div>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </aside>
  );
};

export default Sidebar;
