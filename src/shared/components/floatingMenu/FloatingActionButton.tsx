interface FloatingActionButtonProps {
  name: string;
  icon: React.ReactNode;
}
const FloatingActionButton = ({ name, icon }: FloatingActionButtonProps) => {
  return (
    <button className='floatingActionButton'>
      {icon}
      <span className='text-sm'>{name}</span>
    </button>
  );
};

export default FloatingActionButton;
