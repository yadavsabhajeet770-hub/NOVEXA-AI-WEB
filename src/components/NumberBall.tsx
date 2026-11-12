/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, memo } from 'react';
import { motion } from 'motion/react';
import { getBallImageUrl, getFallbackBallImageUrl } from '../utils/ballImages';
import { primaryCol, hasViolet } from '../utils/aiEngine';

interface NumberBallProps {
  number: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isWinner?: boolean;
  isDimmed?: boolean;
  isShaking?: boolean;
  onClick?: () => void;
  className?: string;
  showGlow?: boolean;
}

const sizeClasses = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-11 h-11 text-base',
  lg: 'w-14 h-14 md:w-16 md:h-16 text-xl',
  xl: 'w-20 h-20 md:w-24 md:h-24 text-2xl',
};

const NumberBallComponent: React.FC<NumberBallProps> = ({
  number,
  size = 'md',
  isWinner = false,
  isDimmed = false,
  isShaking = false,
  onClick,
  className = '',
  showGlow = true,
}) => {
  const safeNum = Math.abs(Math.floor(number)) % 10;
  const initialUrl = getBallImageUrl(safeNum);
  const [currentUrl, setCurrentUrl] = useState<string>(initialUrl);
  const [imgLoaded, setImgLoaded] = useState<boolean>(true);
  const [imgError, setImgError] = useState<boolean>(false);

  useEffect(() => {
    setCurrentUrl(getBallImageUrl(safeNum));
    setImgError(false);
  }, [safeNum]);

  const isRed = primaryCol(safeNum) === 'RED';
  const violet = hasViolet(safeNum);

  let fallbackBg = '';
  if (safeNum === 0) {
    fallbackBg = 'conic-gradient(from 220deg, #ef4d54 0% 50%, #8b5cf6 50% 100%)';
  } else if (safeNum === 5) {
    fallbackBg = 'conic-gradient(from 220deg, #1fbf73 0% 50%, #8b5cf6 50% 100%)';
  } else if (isRed) {
    fallbackBg = 'radial-gradient(circle at 30% 28%, #ffd2d4 0%, #ffffff 25%, #ef4d54 75%)';
  } else {
    fallbackBg = 'radial-gradient(circle at 30% 28%, #d6ffe6 0%, #ffffff 25%, #1fbf73 75%)';
  }

  const baseClasses = `relative select-none aspect-square rounded-full flex items-center justify-center shrink-0 cursor-pointer ${
    sizeClasses[size]
  } ${
    isWinner
      ? 'z-20 ring-4 ring-amber-300 shadow-[0_0_24px_rgba(245,158,11,0.65)]'
      : isDimmed
      ? 'opacity-35 grayscale-[50%] scale-95'
      : 'hover:shadow-md'
  } ${className}`;

  const ballContent = (
    <>
      {!imgError && (
        <img
          src={currentUrl}
          alt={`Number ${safeNum}`}
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            const fallback = getFallbackBallImageUrl(safeNum);
            if (currentUrl !== fallback) {
              setCurrentUrl(fallback);
            } else {
              setImgError(true);
            }
          }}
          className={`absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-md transition-opacity duration-150 ${
            imgLoaded ? 'opacity-100' : 'opacity-90'
          }`}
        />
      )}

      {(!imgLoaded || imgError) && (
        <div
          className="absolute inset-0 w-full h-full rounded-full shadow-inner flex items-center justify-center font-['Sora'] font-black text-white"
          style={{
            background: fallbackBg,
            color: violet ? '#ffffff' : isRed ? '#7a1d22' : '#0d5a37',
          }}
        >
          {safeNum}
        </div>
      )}

      {isWinner && showGlow && (
        <span
          className="absolute -inset-1 rounded-full opacity-70 animate-ping pointer-events-none"
          style={{ background: 'radial-gradient(circle, #fde047, #f59e0b)' }}
        />
      )}
    </>
  );

  // If interactive or animated, use motion.div
  if (onClick || isWinner || isShaking) {
    return (
      <motion.div
        whileHover={onClick ? { scale: 1.08, y: -2 } : undefined}
        whileTap={onClick ? { scale: 0.94 } : undefined}
        animate={
          isShaking
            ? {
                x: [-2, 2, -3, 3, 0],
                y: [-1, 2, -2, 1, 0],
                rotate: [-4, 4, -3, 3, 0],
                transition: { repeat: Infinity, duration: 0.25 },
              }
            : isWinner
            ? {
                scale: [1, 1.14, 1.08],
                transition: {
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 1.2,
                  ease: 'easeInOut',
                },
              }
            : { scale: 1 }
        }
        onClick={onClick}
        className={baseClasses}
      >
        {ballContent}
      </motion.div>
    );
  }

  // Pure static element for table/history rows (butter-smooth scrolling)
  return <div className={baseClasses}>{ballContent}</div>;
};

export const NumberBall = memo(NumberBallComponent);
