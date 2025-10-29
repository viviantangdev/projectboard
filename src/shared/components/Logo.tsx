import LogoImage from '../../assets/logo.svg';


const Logo = () => {
  return (
    <div className='flex items-center gap-2'>
      <img src={LogoImage} alt='Logo' className='h-5' />
      <h1 className='text-lg text-sky-500 text-shadow-2xs'>ProjectBoard</h1>
    </div>
  );
};

export default Logo;
