'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../styles';
import { navVariants } from '../utils/motion.js';
import HamburguerMenu from './HamburguerMenu';

const Navbar = () => (
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative z-50`}
  >
    <div className="absolute w-[50%] inset-0 gradient-01" />
    <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8 h-[50px] items-center`}>
      <Image
        src="/search.svg"
        alt="search"
        className="w-[24px] h-[24px] object-contain flex items-center"
      />
      <h2 className="font-extrabold text-[24px] leading-[30px] text-white uppercase flex items-center">
        benito tech
      </h2>
      <HamburguerMenu/>
    </div>
  </motion.nav>
);

export default Navbar;
