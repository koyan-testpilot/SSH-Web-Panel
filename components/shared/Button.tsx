
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'icon';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  const baseClasses = 'font-bold py-2 px-4 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-accent hover:bg-accent-hover text-white shadow-lg disabled:bg-slate-600 disabled:cursor-not-allowed',
    secondary: 'bg-tertiary hover:bg-slate-600 text-text-secondary disabled:bg-slate-800 disabled:text-slate-500',
    icon: 'p-2 text-text-secondary hover:text-text-primary hover:bg-tertiary rounded-full'
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
