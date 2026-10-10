'use client';

import type {ReactNode} from 'react';
import {motion, useReducedMotion} from 'motion/react';

export function AnimatedPrinciple({children, index}: {children: ReactNode; index: number}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.li
      initial={reducedMotion ? false : {opacity: 0, y: 12}}
      whileInView={{opacity: 1, y: 0}}
      whileHover={reducedMotion ? undefined : {y: -3, transition: {duration: 0.22, ease: 'easeOut'}}}
      viewport={{once: true, amount: 0.3}}
      transition={reducedMotion
        ? {duration: 0}
        : {duration: 0.5, delay: index * 0.1, ease: 'easeOut'}}
    >
      {children}
    </motion.li>
  );
}
