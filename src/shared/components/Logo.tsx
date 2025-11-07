import { NavLink } from 'react-router';
import LogoImage from '../../assets/logo.svg';

const Logo = () => {
  return (
    <NavLink to={'/dashboard'} className='flex items-center gap-2'>
      <img src={LogoImage} alt='Logo' className='h-5' />
      <h1 className='text-sky-500 text-shadow-2xs'>ProjectBoard</h1>
    </NavLink>
  );
};

export default Logo;
