import React, { CSSProperties } from 'react';
import styles from './Card.module.css';

type CardProps = {
  title: string;
  content: string;
  titleStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  className?: string;
};

const Card = ({ title, content, titleStyle, contentStyle }: CardProps) => (
  <div className={styles.card}>
    <p className={styles.card_title} style={titleStyle}>
      {title}
    </p>
    <p className={styles.card_content} style={contentStyle}>
      {content}
    </p>
  </div>
);

export default Card;
