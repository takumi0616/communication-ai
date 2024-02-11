import React, { CSSProperties } from 'react';
import { Lexend } from "next/font/google";
import styles from './Header.module.css';

type HeaderProps = {
  title: string;
  titleStyle?: CSSProperties;
};

const LexendFont = Lexend({
  weight: "700",
  subsets: ["latin"],
});

const Header = ({ title, titleStyle }: HeaderProps) => (
  <header className={styles.header}>
    <h1 className={LexendFont.className} style={titleStyle}>{title}</h1>
  </header>
);

export default Header;
