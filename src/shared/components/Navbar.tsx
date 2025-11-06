import { useState } from 'react';
import { GoChevronDown } from 'react-icons/go';
import { HiMiniBars3, HiOutlineXMark } from 'react-icons/hi2';
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
          <HiOutlineXMark className='size-5' />
        ) : (
          <HiMiniBars3 className='size-5' />
        )}
      </button>
      {/*Navbar menu */}
      <nav
        className={`navbar ${
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
                    {nav.name}
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
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
