import React, { CSSProperties } from 'react';
import styles from './Header.module.css';

type HeaderProps = {
  title: string;
  titleStyle?: CSSProperties;
};

const Header = ({ title, titleStyle }: HeaderProps) => (
  <header className={styles.header}>
    <h1 style={titleStyle}>{title}</h1>
  </header>
);

export default Header;
