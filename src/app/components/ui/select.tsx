import { ReactNode, SelectHTMLAttributes, OptionHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  className?: string;
}

export function Select({ children, className = "", ...props }: SelectProps) {
    return (
      <select className={`border p-2 rounded w-full ${className}`} {...props}>
        {children}
      </select>
    );
  }

interface SelectItemProps extends OptionHTMLAttributes<HTMLOptionElement> {
  value: string;
  children: ReactNode;
}

export function SelectItem({ value, children }: SelectItemProps) {
    return <option value={value}>{children}</option>;
  }
  