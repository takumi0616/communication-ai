import React, { CSSProperties } from 'react';
import styles from './Header.module.css';

type HeaderProps = {
  title: string;
  titleStyle?: CSSProperties;
};

const Header = ({ title, titleStyle }: HeaderProps) => (
  <header className={styles.header}>
    <p style={titleStyle}>{title}</p>
  </header>
);

export default Header;
