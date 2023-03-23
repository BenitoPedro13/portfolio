'use client';

import { motion, useWillChange } from 'framer-motion';
import React from 'react';
import { textContainer, textVariant2 } from '../utils/motion.js';

export type Props = {textStyles?: string, title: Iterable<React.ReactNode>}
export type Props1 = {textStyles?: string, title: React.ReactNode}

export const TypingText = ({ textStyles, title }: Props) => {
  const willChange = useWillChange()
  return  (
    <motion.p
    variants={textContainer}
    style={{willChange}}
    className={`font-normal text-[14px] text-secondary-white ${textStyles}`}
  >
    {Array.from(title).map((letter, index) => (
      <motion.span style={{willChange}} variants={textVariant2} key={index} >
        {letter === ' ' ? '\u00A0' : letter as React.ReactNode}
      </motion.span>
    ))}
  </motion.p>
)};

export const TitleText = ({ textStyles, title }: Props1) => {
  const willChange = useWillChange()
  return(
  <motion.h2
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    style={{willChange}}
    className={`mt-[8px] font-bold md:text-[64px] text-[40px] text-white ${textStyles}`}
  >
    {title}
  </motion.h2>
)};
