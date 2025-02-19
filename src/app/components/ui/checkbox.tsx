import { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Checkbox({ label, ...props }: CheckboxProps) {
    return (
      <label className="flex items-center space-x-2">
        <input type="checkbox" className="accent-blue-500" {...props} />
        <span>{label}</span>
      </label>
    );
  }
  