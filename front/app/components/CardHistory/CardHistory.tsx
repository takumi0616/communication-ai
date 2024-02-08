import React, { useState, useEffect, CSSProperties } from 'react';
import DOMPurify from 'dompurify'; // 必要時のみ import
import styles from './CardHistory.module.css';

type CardHistoryProps = {
  title: string;
  content: string;
  titleStyle?: CSSProperties;
  contentStyle?: CSSProperties;
};

const CardHistory = ({ title, content, titleStyle, contentStyle }: CardHistoryProps) => {
  const [sanitizedLines, setSanitizedLines] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const lines = content.split('\n').map((line, index) => {
      const sanitizedLine = DOMPurify.sanitize(line, {
        USE_PROFILES: { html: true },
      });
      return (
        <p
          key={index}
          style={{ margin: '5px 0' }}
          dangerouslySetInnerHTML={{ __html: sanitizedLine }}
        />
      );
    });
    setSanitizedLines(lines);
  }, [content]);

  return (
    <div className={styles.card_history}>
      <p className={styles.card_title} style={titleStyle}>
        {title}
      </p>
      <div
        className={styles.card_content}
        style={{ ...contentStyle, maxHeight: '300px', overflowY: 'scroll' }}
      >
        {sanitizedLines}
      </div>
    </div>
  );
};

export default CardHistory;

