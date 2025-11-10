import type { ChangeEvent } from 'react';

interface DropdownSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  defaultOption: string;
}
const DropdownSelect = ({
  value,
  onChange,
  options,
  defaultOption,
}: DropdownSelectProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select value={value} onChange={handleChange}>
      <option value=''>{defaultOption}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default DropdownSelect;
