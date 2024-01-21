import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import tw, { css } from 'twin.macro';

import useEffectOnce from '@/hooks/useEffectOnce';
import { extractRgbFromString, hexToRgb, rgbToHex, safeRange } from '@/utils/color';
import { randomNumber } from '@/utils/random';

import { Circle } from './Circle';

interface DynamicGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  colors: string[];
  circleAmount?: number;
  fps?: number;
  speed?: number;
}

// TODO: pause animation
export const DynamicGradient: React.FC<DynamicGradientProps> = ({
  colors,
  circleAmount = 10,
  fps = 60,
  speed = 1,
  children,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reqAnimRef = useRef<number>();
  const lastAnimateTimeRef = useRef<number>();
  const animateInterval = useMemo(() => 1000 / fps, [fps]);
  const PI2 = useMemo(() => Math.PI * 2, []);

  const backgroundRef = useRef<HTMLDivElement>(null);
  // const [backgroundColor, setBackgroundColor] = useState<string>('#FFFFFF');
  const circlesRef = useRef<Circle[]>([]);
  // const [circles, setCircles] = useState<Circle[]>([]);

  const setCircles = useCallback((circles: Circle[]) => {
    circlesRef.current = circles;
  }, []);

  const renderCircles = useCallback(
    (delta: number) => {
      const { current: container } = containerRef;
      const { current: canvas } = canvasRef;
      const { current: circles } = circlesRef;
      const { current: background } = backgroundRef;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx || !container || !background) return;

      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;

      const currentBgColor = rgbToHex(
        extractRgbFromString(background.style.backgroundColor),
      ).toUpperCase();
      const currentBgRGB = hexToRgb(currentBgColor);
      const targetBgColor = colors.at(0)?.toUpperCase() ?? '#000000';
      const endBgColor = hexToRgb(targetBgColor);

      if (currentBgColor !== targetBgColor) {
        for (let i = 0; i < 3; i++) {
          if (currentBgRGB[i] < endBgColor[i]) {
            currentBgRGB[i] = safeRange(0, endBgColor[i], currentBgRGB[i] + delta);
          } else if (currentBgRGB[i] > endBgColor[i]) {
            currentBgRGB[i] = safeRange(endBgColor[i], 255, currentBgRGB[i] - delta);
          }
        }
        background.style.backgroundColor = rgbToHex(currentBgRGB).toUpperCase();
      }

      // ctx.fillStyle = rgbToHex(currentBgColor).toUpperCase();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'saturation';
      for (const circle of circles) {
        ctx.beginPath();

        const px = (canvas.offsetWidth * circle.x) / 100;
        const py = (canvas.offsetHeight * circle.y) / 100;

        const fillStyle = ctx.createRadialGradient(px, py, circle.r * 0.01, px, py, circle.r);
        fillStyle.addColorStop(0.2, `${circle.color}`);
        fillStyle.addColorStop(1, `${circle.color}00`);

        ctx.fillStyle = fillStyle;
        ctx.arc(px, py, circle.r, 0, PI2, false);
        ctx.fill();

        ctx.closePath();
      }
    },
    [PI2, colors],
  );

  const animate = useCallback(() => {
    const { current: lastAnimateTime } = lastAnimateTimeRef;
    const { current: circles } = circlesRef;
    if (lastAnimateTime === undefined) return;

    const now = Date.now();
    const delta = now - lastAnimateTime;
    if (delta > animateInterval) {
      setCircles(circles.map((circle) => circle.animate(delta)));
      renderCircles(delta);

      lastAnimateTimeRef.current = now;
    }
    reqAnimRef.current = window.requestAnimationFrame(animate);
  }, [animateInterval, renderCircles, setCircles]);

  useEffect(() => {
    const { current: circles } = circlesRef;

    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];
      // console.log('current:', circle.color, 'next:', circle.targetColor);
      circle.targetColor = colors[i % colors.length];
    }

    lastAnimateTimeRef.current = Date.now();

    reqAnimRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (reqAnimRef.current) window.cancelAnimationFrame(reqAnimRef.current);
    };
  }, [animate, colors]);

  useEffectOnce(() => {
    if (!containerRef.current) return;
    const newCircles = [];

    const xmin = -15;
    const xmax = 115;
    const ymin = -15;
    const ymax = 115;

    for (let i = 1; i <= circleAmount; i++) {
      // const colors = ["#00f", "#00a", "#00b", "#00c", "#00d", "#00e"];
      newCircles.push(
        new Circle(
          randomNumber(xmin, xmax),
          randomNumber(ymin, ymax),
          randomNumber(-0.005, 0.005) * speed,
          randomNumber(-0.005, 0.005) * speed,
          randomNumber(800, 1500),
          colors[(i - 1) % colors.length],
          xmin,
          xmax,
          ymin,
          ymax,
        ),
      );
    }

    setCircles(newCircles);
  });

  return (
    <div ref={containerRef} {...props}>
      <div ref={backgroundRef} css={[tw`absolute w-full h-full -z-50`, tw`bg-black`]} />
      <canvas ref={canvasRef} css={[tw`absolute w-full h-full`, tw`-z-40`]} />
      {children}
    </div>
  );
};
