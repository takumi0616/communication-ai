import React, { useEffect, useState } from 'react';
import styles from './MouseTracker.module.css';

type PointerProps = {
  name: string;
  position: { x: number; y: number };
};

const Pointer = ({ name, position }: PointerProps) => (
  <div
    className={`${styles.pointer_base} ${styles[name]}`}
    style={{
      transform: `translate(${position.x}px, ${position.y}px)`,
    }}
  ></div>
);

function MouseTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMoveListener = (event: MouseEvent) => {
      setMousePosition({ x: event.pageX, y: event.pageY });
    };

    window.addEventListener('mousemove', mouseMoveListener);

    return () => {
      window.removeEventListener('mousemove', mouseMoveListener);
    };
  }, []);

  return (
    <div>
      <Pointer name="pointer_small" position={mousePosition} />
      <Pointer name="pointer" position={mousePosition} />
      <Pointer name="pointer_large" position={mousePosition} />
    </div>
  );
}

export default MouseTracker;
