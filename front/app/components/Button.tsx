import React, { ReactNode, MouseEvent } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const Button = ({ children, onClick, disabled }: ButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`bg-orange-400 text-white py-2 px-4 m-2 rounded text-xl font-bold cursor-pointer ${
      disabled ? 'bg-orange-400/60' : ''
    }`}
  >
    {children}
  </button>
);

export default Button;
