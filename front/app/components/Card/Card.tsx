import React, { CSSProperties } from 'react';
import DOMPurify from 'dompurify';
import styles from './Card.module.css';

type CardProps = {
  title: string;
  content: string;
  titleStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  className?: string;
};

const Card = ({ title, content, titleStyle, contentStyle }: CardProps) => {
  const sanitizedContent = DOMPurify.sanitize(content);
  return(
    <div className={styles.card}>
    <p className={styles.card_title} style={titleStyle}>
      {title}
    </p>
    <div className={styles.card_content} style={contentStyle} dangerouslySetInnerHTML={{ __html: sanitizedContent }}>
    </div>
  </div>
  )
}

export default Card;
