import React from 'react';

type CardProps = {
  title: string;
  content: string;
};

const Card = ({ title, content }: CardProps) => (
  <div className="bg-green-500 text-[#FBF6EE] p-4 my-4 mx-auto w-4/5 rounded">
    <p className="font-bold text-xl">{title}</p>
    <p className="mt-2 font-bold text-2xl">{content}</p>
  </div>
);

export default Card;
