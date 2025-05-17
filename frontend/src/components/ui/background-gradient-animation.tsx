"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type MixBlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "color-dodge"
  | "color-burn"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion"
  | "hue"
  | "saturation"
  | "color"
  | "luminosity";

interface BackgroundGradientAnimationProps {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: MixBlendMode;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  pointerColor = "140, 100, 255",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: BackgroundGradientAnimationProps) => {
  const interactiveRef = useRef<HTMLDivElement>(null);

  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) return;
      setCurX(curX + (tgX - curX) / 20);
      setCurY(curY + (tgY - curY) / 20);
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    }

    move();
  }, [curX, curY, tgX, tgY]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!interactiveRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setTgX(event.clientX - rect.left);
    setTgY(event.clientY - rect.top);
  };

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        containerClassName
      )}
      onMouseMove={interactive ? handleMouseMove : undefined}
    >
      <svg className="absolute h-full w-full">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>

        <g className="goo-blobs" filter="url(#goo)">
          <circle
            className="blob"
            cx="50%"
            cy="50%"
            r="100"
            fill={`rgba(${firstColor}, 0.8)`}
            style={{
              transform: `scale(${size})`,
              mixBlendMode: blendingValue,
            }}
          />
          <circle
            className="blob"
            cx="50%"
            cy="50%"
            r="100"
            fill={`rgba(${secondColor}, 0.8)`}
            style={{
              transform: `scale(${size})`,
              mixBlendMode: blendingValue,
            }}
          />
          <circle
            className="blob"
            cx="50%"
            cy="50%"
            r="100"
            fill={`rgba(${thirdColor}, 0.8)`}
            style={{
              transform: `scale(${size})`,
              mixBlendMode: blendingValue,
            }}
          />
          <circle
            className="blob"
            cx="50%"
            cy="50%"
            r="100"
            fill={`rgba(${fourthColor}, 0.8)`}
            style={{
              transform: `scale(${size})`,
              mixBlendMode: blendingValue,
            }}
          />
          <circle
            className="blob"
            cx="50%"
            cy="50%"
            r="100"
            fill={`rgba(${fifthColor}, 0.8)`}
            style={{
              transform: `scale(${size})`,
              mixBlendMode: blendingValue,
            }}
          />
        </g>
      </svg>

      <div
        ref={interactiveRef}
        className={cn(
          "absolute h-full w-full",
          interactive ? "cursor-none" : "",
          className
        )}
      >
        {interactive && (
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-70 blur-xl"
            style={{
              backgroundColor: `rgba(${pointerColor}, 0.8)`,
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
}; 