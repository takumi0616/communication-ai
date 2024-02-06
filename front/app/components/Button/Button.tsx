import React, { ReactNode, MouseEvent, CSSProperties } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  style?: CSSProperties;
};

const Button = ({ children, onClick, disabled, style }: ButtonProps) => (
  <button
    className={styles.button}
    onClick={onClick}
    disabled={disabled}
    style={style}
  >
    {children}
  </button>
);

export default Button;
