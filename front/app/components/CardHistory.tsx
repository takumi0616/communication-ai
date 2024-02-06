import React from 'react';

type CardHistoryProps = {
  title: string;
  content: string;
};

const CardHistory = ({ title, content }: CardHistoryProps) => {
  const lines = content.split('\n').map((line, index) => (
    <p key={index} className="my-1">
      {line}
    </p>
  ));

  return (
    <div className="bg-green-500 text-[#FBF6EE] p-4 my-4 mx-auto w-4/5 rounded overflow-y-scroll max-h-72">
      <p className="font-bold text-xl">{title}</p>
      <div>{lines}</div>
    </div>
  );
};

export default CardHistory;
