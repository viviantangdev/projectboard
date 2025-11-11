interface InputProps {
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeHolder: string;
}

const Input = ({ value, onChange, type = 'text',placeHolder }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeHolder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Input;
