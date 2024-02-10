import React, { useState, useEffect, CSSProperties } from 'react';
import DOMPurify from 'dompurify'; // 必要時のみ import
import styles from './Card.module.css';

type CardProps = {
  name: string;
  title: string;
  content: string;
  titleStyle?: CSSProperties;
  contentStyle?: CSSProperties;
};

const Card = ({ name, title, content, titleStyle, contentStyle }: CardProps) => {
  const [sanitizedContent, setSanitizedContent] = useState('');

  useEffect(() => {
    setSanitizedContent(DOMPurify.sanitize(content)); // DOMPurifyをすぐに実行
  }, [content]);

  return (
    <div className={`${styles.card} ${styles[name]}`} tabIndex={0}>
      <h2 className={styles.card_title} style={titleStyle}>
        {title}
      </h2>
      <div className={styles.card_content} style={contentStyle} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </div>
  );
};

export default Card;

