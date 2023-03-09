'use client';

import { motion } from "framer-motion";
import React from "react";
import styles from "../styles";
import { fadeIn, staggerContainer, textContainer, textVariant2 } from "../utils/motion.js";

export const TypingText = ({textStyles, title}: any) => (
  <motion.p
  variants={textContainer}
  className={`font-normal text-[14px] text-secondary-white ${textStyles}`}
>
  {Array.from(title).map((letter, index) => (
    <motion.span variants={textVariant2} key={index}>
      {letter === ' ' ? '\u00A0' : letter as React.ReactNode}
    </motion.span>
  ))}
</motion.p>
);

export const TitleText = ({textStyles, title}: any) => (
  <motion.h2
  variants={textVariant2}
  initial="hidden"
  whileInView="show"
  className={`mt-[8px] font-bold md:text-[64px] text-[40px] text-white ${textStyles}`}
>
  {title}
</motion.h2>
);
