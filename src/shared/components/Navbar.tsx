import { useState } from 'react';
import { FaBarsStaggered, FaXmark } from 'react-icons/fa6';
import { GoChevronDown } from 'react-icons/go';
import { NavLink } from 'react-router';
import Logo from '../components/Logo';
import ThemeToggle from '../components/ThemeToggle';
import { useNavigations } from '../hooks/useNavigations';

const Navbar = () => {
  const navigations = useNavigations();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);

  const onToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
  return (
    <header className='navHeader'>
      <Logo />
      <button onClick={onToggle} className='transform-smooth'>
        {isNavbarOpen ? (
          <FaXmark className='size-5' />
        ) : (
          <FaBarsStaggered className='size-5' />
        )}
      </button>
      {/*Navbar menu */}
      <nav
        className={`navbar flex flex-col justify-between ${
          isNavbarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex flex-col gap-2'>
          {navigations.map((nav, index) => (
            <div key={index} className='flex flex-col gap-1'>
              {nav.children && nav.children.length > 0 ? (
                <>
                  <button
                    onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                    className='navlink flex justify-between items-center'
                  >
                    <div className="flex items-center gap-2 text-wrap">
                      {nav.icon}
                      <span className="nav-text">{nav.name}</span>
                    </div>
                    <span
                      className={`transition-transform duration-300 ${
                        isProjectsOpen ? 'rotate-180' : 'rotate-0'
                      }`}
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
                            `flex items-center gap-1 navlink ${
                              isActive ? 'navlinkActive' : ''
                            }`
                          }
                        >
                          {child.icon}
                          <span className="nav-text">{child.name}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to={nav.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 navlink ${
                      isActive ? 'navlinkActive' : ''
                    }`
                  }
                >
                  {nav.icon}
                  <span className="nav-text">{nav.name}</span>
                </NavLink>
              )}
            </div>
          ))}
        </div>
        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Navbar;
