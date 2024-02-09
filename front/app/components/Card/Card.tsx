import React, { useState, useEffect, CSSProperties } from 'react';
import DOMPurify from 'dompurify'; // 必要時のみ import
import styles from './Card.module.css';

type CardProps = {
  title: string;
  content: string;
  titleStyle?: CSSProperties;
  contentStyle?: CSSProperties;
};

const Card = ({ title, content, titleStyle, contentStyle }: CardProps) => {
  const [sanitizedContent, setSanitizedContent] = useState('');

  useEffect(() => {
    setSanitizedContent(DOMPurify.sanitize(content)); // DOMPurifyをすぐに実行
  }, [content]);

  return (
    <div className={styles.card} tabIndex={0}>
      <p className={styles.card_title} style={titleStyle}>
        {title}
      </p>
      <div className={styles.card_content} style={contentStyle} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </div>
  );
};

export default Card;

