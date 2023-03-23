"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { socials } from "../constants";

import styles from "../styles";
import { footerVariants } from "../utils/motion";

const Footer = () => (
  <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    <div className="footer-gradient" />
    <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
      <div className="flex items-center justify-between flex-wrap gap-5">
        <h4 className="font-bold md:text-[64px] text-[44px] text-white">
          Entre em contato
        </h4>
        <button
          type="button"
          className="flex items-center h-fit py-4 px-6 bg-[#25618B] rounded-[32px] gap-[12px]"
        >
          <div className="w-[24px] h-[24px] flex items-center">
            <Image
              src="/headset.svg"
              width={24}
              height={18}
              alt="headset"
              className=" object-contain"
            />
          </div>
        <a href="https://wa.me/5521987854401">
          <span className="font-normal text-[16px] text-white">
            Entre em contato
          </span>
        </a>
          
        </button>
      </div>

      <div className="flex flex-col">
        <div className="mb-[50px] h-[2px] bg-white opacity-10" />

        <div className="flex items-center justify-between flex-wrap gap-4">
          <h4 className="font-extrabold text-[24px] text-white uppercase">
            Benito Pedro
          </h4>
          <p className="font-normal text-[14px] text-white opacity-50">
            Copyright © 2021 - 2023 All rights reserved | Benito Pedro Xavier
            Neto
          </p>

          <div className="flex gap-4">
            {socials.map((social, i) => (
              <div key={i} className="w-[24px] h-[24px]">
                <Image
                  key={social.name}
                  src={social.url}
                  alt={social.name}
                  width={30}
                  height={30}
                  className="object-contain cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
