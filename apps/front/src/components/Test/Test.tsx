import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import tw, { css } from 'twin.macro';

import { randomNumber } from '@/utils/random';

import Circle from './Circle';

interface TestProps {
  colors: string[];
  fps?: number;
}

const Test: React.FC<TestProps> = ({ colors, fps = 60 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reqAnimRef = useRef<number>();
  const lastAnimateTimeRef = useRef<number>();
  const animateInterval = useMemo(() => 1000 / fps, [fps]);

  const [circles, setCircles] = useState<Circle[]>([]);

  const createCircles = useCallback(() => {
    if (!containerRef.current) return;
    const newCircles = [];

    for (let i = 1; i <= 40; i++) {
      // const colors = ["#00f", "#00a", "#00b", "#00c", "#00d", "#00e"];
      newCircles.push(
        new Circle(
          randomNumber(0, 100),
          randomNumber(0, 100),
          randomNumber(-0.005, 0.005),
          randomNumber(-0.005, 0.005),
          randomNumber(45, 65),
          colors[Math.round(randomNumber(0, colors.length - 1))],
          100,
          100,
        ),
      );
    }

    setCircles(newCircles);
    lastAnimateTimeRef.current = Date.now();
  }, [colors]);

  const animate = useCallback(() => {
    const { current: lastAnimateTime } = lastAnimateTimeRef;
    if (lastAnimateTime === undefined) return;

    const now = Date.now();
    const delta = now - lastAnimateTime;
    if (delta > animateInterval) {
      setCircles((prev) => prev.map((circle) => circle.animate(delta)));

      lastAnimateTimeRef.current = now;
    }
    reqAnimRef.current = window.requestAnimationFrame(animate);
  }, [animateInterval]);

  useEffect(() => {
    createCircles();
    reqAnimRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (reqAnimRef.current) window.cancelAnimationFrame(reqAnimRef.current);
    };
  }, [animate, createCircles]);

  const renderedCircles = useMemo(() => {
    return circles.map((circle, idx) => (
      <div
        key={idx}
        className="circle"
        css={[
          tw`absolute`,
          tw`origin-center transition-transform duration-[1s] ease-linear`,
          css`
            /* left: ${circle.x}%;
            top: ${circle.y}%; */
            border-radius: 100%;

            /* width: ${circle.r}rem;
            height: ${circle.r}rem; */

            background-color: ${circle.color};
          `,
        ]}
        style={{
          transform: `translateX(-50%) translateY(-50%)`,
          left: `${circle.x}%`,
          top: `${circle.y}%`,
          width: `${circle.r}rem`,
          height: `${circle.r}rem`,
        }}
      />
    ));
  }, [circles]);

  return (
    <div
      ref={containerRef}
      onResize={(e) => console.log(e)}
      css={[
        tw`w-full h-full absolute overflow-hidden`,
        css`
          filter: url(#circle);
        `,
      ]}
    >
      {renderedCircles}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="circle">
            <feGaussianBlur in="SourceGraphic" stdDeviation="100" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 40 -10"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Test;
