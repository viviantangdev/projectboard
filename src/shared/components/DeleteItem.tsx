interface DeleteItemProp {
  deleteValue: string;
  onCancel: () => void;
  onDelete: () => void;
}
const DeleteItem = ({ deleteValue, onCancel, onDelete }: DeleteItemProp) => {
  return (
    <div className='flex flex-col gap-4 py-5'>
      <p>
        Are you sure you want to delete{' '}
        <span className='italic font-bold'>{deleteValue}</span>?
      </p>
      <div className='flex gap-3 justify-start'>
        <button
          onClick={onCancel}
          className='px-4 py-2 rounded border border-gray-300 hover:bg-gray-100'
        >
          Cancel
        </button>
        <button
          onClick={onDelete}
          className='px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600'
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteItem;
