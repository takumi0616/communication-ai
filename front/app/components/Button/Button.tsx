import React, { ReactNode, MouseEvent, CSSProperties } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  style?: CSSProperties;
  ariaLabel?: string;
};

const Button = ({ children, onClick, disabled, style, ariaLabel }: ButtonProps) => (
  <button
    className={styles.button}
    onClick={onClick}
    disabled={disabled}
    style={style}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

export default Button;
