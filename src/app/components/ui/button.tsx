import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

export function Button({ className = "", children, ...props }: ButtonProps) {
    return (
      <button className={`px-4 py-2 rounded ${className}`} {...props}>
        {children}
      </button>
    );
  }
  