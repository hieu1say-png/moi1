/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - STAGGER REVEAL COMPONENT
 * Wraps child elements to provide choreographed staggered entrance animation.
 * Strictly layout-safe, zero overflow, no style alterations.
 */

import React from 'react';
import { motion, Variants } from 'motion/react';

export interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number; // default 0.08 (80ms)
  as?: 'div' | 'section';
}

const itemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const StaggerReveal: React.FC<StaggerRevealProps> = ({
  children,
  className = '',
  staggerDelay = 0.08,
  as = 'div',
}) => {
  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const childArray = React.Children.toArray(children);
  const MotionComponent = as === 'section' ? motion.section : motion.div;

  return (
    <MotionComponent
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={className}
    >
      {childArray.map((child, index) => (
        <motion.div key={index} variants={itemVariants} className="w-full">
          {child}
        </motion.div>
      ))}
    </MotionComponent>
  );
};
