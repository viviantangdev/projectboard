interface SingleInputtModalContentProps {
  value: string;
  setValue: (value: string) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  onSubmit?: (value: string) => void;
}
const SingleInputModalContent = ({
  value,
  setValue,
  onSubmit,
  setIsModalOpen,
}: SingleInputtModalContentProps) => {
  return (
    <div className='flex flex-col gap-6 py-3'>
      <input
        type='text'
        className='border rounded border-gray-300 px-2 py-1 '
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className='flex gap-3 '>
        <button
          type='button'
          onClick={() => {
            onSubmit!(value);
            setIsModalOpen(false);
          }}
          className='actionButton w-full'
        >
          Save
        </button>
        <button
          type='button'
          onClick={() => {
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

export default SingleInputModalContent;
