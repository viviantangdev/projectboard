interface TaskFormSingleInputProps {
  value: string;
  setValue: (value: string) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  onSubmit: () => void;
}
const TaskFormSingleInput = ({
  value,
  setValue,
  onSubmit,
  setIsModalOpen,
}: TaskFormSingleInputProps) => {
  return (
    <div className='flex flex-col py-6'>
      <input
        type='text'
        className='searchInput'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className='flex gap-3 pt-5'>
        <button
          type='button'
          onClick={() => {
            onSubmit();
            setValue('');
            setIsModalOpen(false);
          }}
          className='actionButton w-full'
        >
          Save
        </button>
        <button
          type='button'
          onClick={() => {
            setValue('');
            setIsModalOpen(false);
          }}
          className='cancelButton w-full'
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TaskFormSingleInput;
