import React, { CSSProperties } from 'react';
import styles from './CardHistory.module.css';

type CardHistoryProps = {
  title: string;
  content: string;
  titleStyle?: CSSProperties;
  contentStyle?: CSSProperties;
};

const CardHistory = ({
  title,
  content,
  titleStyle,
  contentStyle,
}: CardHistoryProps) => {
  // 会話履歴の内容を改行で分割し、それぞれの行を個別の段落として表示
  const lines = content.split('\n').map((line, index) => (
    <p key={index} style={{ margin: '5px 0' }}>
      {line}
    </p>
  ));

  return (
    <div className={styles.card_history}>
      <p className={styles.card_title} style={titleStyle}>
        {title}
      </p>
      <div
        className={styles.card_content}
        style={{ ...contentStyle, maxHeight: '300px', overflowY: 'scroll' }}
      >
        {lines}
      </div>
    </div>
  );
};

export default CardHistory;
