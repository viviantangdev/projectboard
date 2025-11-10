interface InputProps {
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeHolder: string;
  className?: string;
}

const Input = ({ value, onChange, type = 'text',placeHolder, className }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeHolder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    />
  );
};

export default Input;
