import React, { useState, useEffect, CSSProperties } from 'react';
import styles from './Card.module.css';

type CardProps = {
  title: string;
  content: string;
  titleStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  className?: string;
};

const Card = ({ title, content, titleStyle, contentStyle }: CardProps) => {
  const [sanitizedContent, setSanitizedContent] = useState('');

  useEffect(() => {
    // クライアントサイドでのみDOMPurifyをロードしてサニタイズする非同期関数
    const sanitizeContent = async () => {
      try {
        const DOMPurify = await import('dompurify');
        const sanitized = DOMPurify.sanitize(content);
        setSanitizedContent(sanitized);
      } catch (error) {
        console.error('Failed to load or sanitize with DOMPurify:', error);
        // ここでエラーハンドリングを行うか、デフォルトのアクションを定義
      }
    };

    sanitizeContent();
  }, [content]); // content が変更されたときにのみ再実行

  return (
    <div className={styles.card}>
      <p className={styles.card_title} style={titleStyle}>
        {title}
      </p>
      <div className={styles.card_content} style={contentStyle} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </div>
  );
};

export default Card;
