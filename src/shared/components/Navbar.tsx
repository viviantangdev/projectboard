import { useState } from 'react';
import { HiMiniBars3, HiOutlineXMark } from 'react-icons/hi2';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const onToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
  return (
    <header className='header'>
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
          vnsdlkvn
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
