'use client';

import React, { useState, useEffect } from 'react';
import { Header, Button, Card, CardHistory } from './components';
import styles from './page.module.css';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const Home = () => {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [conversationHistory, setConversationHistory] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY_1;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [delayForSpeech, setDelayForSpeech] = useState(0);
  const [fontSize, setFontSize] = useState(180);
  const increaseFontSize = () => {
    setFontSize((prevFontSize) => prevFontSize + 20);
  };
  const decreaseFontSize = () => {
    setFontSize((prevFontSize) => prevFontSize - 20);
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.lang = 'ja-JP';
      recognitionInstance.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setInputText(text);
        handleSubmit(text);
      };
      recognitionInstance.onend = () => setIsListening(false);
      setRecognition(recognitionInstance);
    }
  }, []);

  const startListening = () => {
    if (recognition && !isListening) {
      recognition.start();
      setIsListening(true);
      setIsGeneratingResponse(false); // 応答生成中ではない
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
      setIsGeneratingResponse(true); // 応答を生成中に設定
    }
  };

  type TextPart = {
    text: string;
    emphasis: boolean;
  };

  const speak = (text: string) => {
    if (text) {
      setIsSpeaking(true); // 音声出力を開始
    }
  };

  useEffect(() => {
    if (!isListening && !isSpeaking && recognition && !isGeneratingResponse) {
      const timer = setTimeout(() => {
        startListening();
      }, delayForSpeech);

      return () => clearTimeout(timer);
    }
  }, [
    isListening,
    isSpeaking,
    recognition,
    delayForSpeech,
    isGeneratingResponse,
  ]);

  const generateText = async (instruction: string) => {
    const body = {
      model: 'gpt-4-1106-preview',
      messages: [{ role: 'user', content: instruction }],
      max_tokens: 1000,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    };

    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsGeneratingResponse(false); // 応答生成完了
        return data.choices[0].message.content;
      } else {
        console.error('Response error:', response.status);
        setIsGeneratingResponse(false); // 応答生成完了
        return '';
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setIsGeneratingResponse(false); // 応答生成完了
      return '';
    }
  };

  const handleSubmit = async (spokenText: string) => {
    setConversationHistory((prev) => prev + `あなた：${spokenText}\n`);

    const instruction = `
      #相手からの入力された言葉
      ${spokenText}

      #命令文
      あなたは「話し相手」です。
      役割を元に相手からの入力された言葉、今までの会話からの情報を参考に、返答のみをして、話し相手になってください。
      入力された返答のみを日本語で出力してください。
      長すぎる返答は相手を混乱させるため、文字数は100文字程度とします。
      ただし、返答文内の重要なキーワードにたいしてem要素をつけるようにしなさい。

      #役割
      認知症患者または独居老人との会話を行う。
      認知症患者または独居老人との会話を行う。
      ユーザーの興味や過去の経験に基づいて、親しみやすく、理解しやすい話題を提供してください。
      会話はゆっくりとしたペースで進行し、繰り返しや明確な言葉遣いを使用して、理解を促進します。
      ユーザーの感情的なニーズに注意を払い、安心感を提供することを心がけてください。
      また、必要に応じて、リラクゼーションのための話題や軽い運動、趣味に関する話題も取り入れてください。
      重要なキーワードは<em>タグで強調してください。

      #今までの会話
      あなたは「話し相手：」です。
      「あなた：」は、言葉を入力している人間のユーザーになります。
      ${conversationHistory}
    `;

    const response = await generateText(instruction);
    setConversationHistory((prev) => prev + `話し相手：${response}\n`);
    setResponseText(response);
    speak(response); // 返答を読み上げる

    await new Promise<void>((resolve) => {
      const checkIfSpeakingEnded = setInterval(() => {
        if (!isSpeaking) {
          clearInterval(checkIfSpeakingEnded);
          resolve(); // この行を追加
        }
      }, 100);
    });

    startListening(); // ここでリスニングを再開
  };

  const getSpeechRecognitionStatus = () => {
    if (isListening) {
      return 'お話できます。';
    } else if (isGeneratingResponse) {
      return '応答を生成中です。';
    }
    return '動作を停止しています。';
  };

  return (
    <div>
      <Header
        title="communication-ai"
        titleStyle={{ fontSize: `${fontSize - 80}%` }}
      />
      <nav className={styles.nav}>
        <div className={styles.nav_button}>
          <div>
            <Button
              onClick={startListening}
              disabled={isListening}
              style={{ fontSize: `${fontSize}%` }}
            >
              {fontSize > 250 ? (
                <>
                  会話
                  <br />
                  スタート
                </>
              ) : (
                '会話スタート'
              )}
            </Button>
            <Button
              onClick={stopListening}
              disabled={!isListening}
              style={{ fontSize: `${fontSize}%` }}
            >
              {fontSize > 250 ? (
                <>
                  会話を
                  <br />
                  停止
                </>
              ) : (
                '会話を停止'
              )}
            </Button>
          </div>
          <div>
            <Button
              onClick={increaseFontSize}
              disabled={fontSize >= 400}
              style={{ fontSize: `${fontSize}%` }}
            >
              {fontSize > 300 ? (
                <>
                  文字を
                  <br />
                  拡大
                </>
              ) : (
                '文字を拡大'
              )}
            </Button>
            <Button
              onClick={decreaseFontSize}
              disabled={fontSize <= 180}
              style={{ fontSize: `${fontSize}%` }}
            >
              {fontSize > 300 ? (
                <>
                  文字を
                  <br />
                  縮小
                </>
              ) : (
                '文字を縮小'
              )}
            </Button>
          </div>
        </div>
        <div>
          <p className={styles.status_bar} style={{ fontSize: `${fontSize}%` }}>
            音声認識ステータス: {getSpeechRecognitionStatus()}
          </p>
        </div>
      </nav>
      <section className={styles.card_field}>
        <div className={styles.input_field}>
          <Card
            title="話している言葉"
            content={inputText}
            titleStyle={{ fontSize: `${fontSize + 80}%` }}
            contentStyle={{ fontSize: `${fontSize}%` }}
          />
        </div>
        <div className={styles.response_field}>
          <Card
            title="応答の言葉"
            content={responseText}
            titleStyle={{ fontSize: `${fontSize + 80}%` }}
            contentStyle={{ fontSize: `${fontSize}%` }}
          />
        </div>
        <div className={styles.history_field}>
          <CardHistory
            title="会話の履歴"
            content={conversationHistory}
            titleStyle={{ fontSize: `${fontSize + 80}%` }}
            contentStyle={{ fontSize: `${fontSize}%` }}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
