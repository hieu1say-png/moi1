/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - NEO FLOATING CARD COMPONENT
 * Educational Neobrutalism: Crisp card with 3px black border and hard shadow.
 */

import React, { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export interface FloatingCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
  id?: string;
  glow?: boolean;
  floatingEffect?: boolean;
  delay?: number;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  className = '',
  id,
  glow = true,
  floatingEffect = true,
  delay = 0,
  ...rest
}) => {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.25,
        delay
      }}
      whileHover={
        floatingEffect
          ? {
              x: -2,
              y: -2,
              transition: { duration: 0.1 }
            }
          : undefined
      }
      className={`
        bg-white rounded-lg p-5 sm:p-6
        border-3 border-black shadow-neo
        transition-shadow duration-100
        ${className}
      `}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

