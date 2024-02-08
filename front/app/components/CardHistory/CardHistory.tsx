import React, { useState, useEffect, CSSProperties } from 'react';
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
    // クライアントサイドでのみDOMPurifyをロードする
    const loadAndSanitize = async () => {
      try {
        const DOMPurify = await import('dompurify');
        const lines = content.split('\n').map((line, index) => {
          const sanitizedLine = DOMPurify.sanitize(line, {
            USE_PROFILES: { html: true },
          });
          return (
            <p key={index} style={{ margin: '5px 0' }} dangerouslySetInnerHTML={{ __html: sanitizedLine }} />
          );
        });
        setSanitizedLines(lines);
      } catch (error) {
        console.error('Failed to load DOMPurify:', error);
        // 適切なエラーハンドリングをここに追加
      }
    };

    loadAndSanitize();
  }, [content]);

  return (
    <div className={styles.card_history}>
      <p className={styles.card_title} style={titleStyle}>
        {title}
      </p>
      <div className={styles.card_content} style={{ ...contentStyle, maxHeight: '300px', overflowY: 'scroll' }}>
        {sanitizedLines}
      </div>
    </div>
  );
};

export default CardHistory;
