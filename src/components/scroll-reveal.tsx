'use client';

import type {ReactNode} from 'react';
import {motion, useReducedMotion} from 'motion/react';

type RevealTag = 'section' | 'header' | 'div' | 'article' | 'li' | 'footer' | 'a';

type Props = {
  children: ReactNode;
  as?: RevealTag;
  className?: string;
  id?: string;
  'aria-labelledby'?: string;
  delay?: number;
  distance?: number;
  href?: string;
  target?: string;
  rel?: string;
};

export function ScrollReveal({children, as = 'div', delay = 0, distance = 16, ...props}: Props) {
  const reducedMotion = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      {...props}
      initial={reducedMotion ? false : {opacity: 0, y: distance}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.05}}
      transition={reducedMotion ? {duration: 0} : {duration: 0.55, delay, ease: 'easeOut'}}
    >
      {children}
    </Component>
  );
}
