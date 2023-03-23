"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import styles from "../styles";
import { fadeIn, staggerContainer, zoomIn } from "../utils/motion";

const Feedback = () => (
  <section className={`${styles.paddings}`}>
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-6`}
    >
      <motion.div
        variants={fadeIn("right", "tween", 0.2, 1)}
        className="flex-[0.5] lg:max-w-[370px] flex justify-end flex-col gradient-05 sm:p-8 p-4 rounded-[32px] border-[1px] border-[#6A6A6A] relative"
      >
        <div className="feedback-gradient" />
        <div>
          <h4 className="font-bold sm:text-[32px] text-[26px] sm:leading-[40.32px] leading-[36.32px] text-white">
            Benito Pedro
          </h4>
          <p className="mt-[8px] font-normal sm:text-[18px] text-[12px] sm:leading-[22.68px] leading-[16.68px] text-white">
            Desenvolvedor Web
          </p>
        </div>

        <p className="mt-[24px] font-normal sm:text-[24px] text-[18px] sm:leading-[45.6px] leading-[39.6px] text-white">
        Se você está procurando um desenvolvedor web autodidata com habilidades rápidas de aprendizado e uma forte paixão por criar soluções inovadoras entre em contato.
        </p>
      </motion.div>

      <motion.div
        variants={fadeIn("left", "tween", 0.2, 1)}
        className="relative flex-1 flex justify-center items-center"
      >
        <div className="w-full lg:h-[610px] h-auto min-h-[210px]">
          <Image
            src="/planet-09.webp"
            alt="planet-09"
            fill
            className="w-full lg:h-[610px] h-auto min-h-[210px] object-cover rounded-[40px]"
          />
        </div>
        <motion.div
          variants={zoomIn(0.4, 1)}
          className="lg:block hidden absolute -left-[10%] top-[3%]"
        >
          {/* <div className="flex justify-end sm:-mt-[70px] -mt-[50px] pr-[40px] relative z-10">
            <a href="#explore">
              <div className="sm:w-[155px] w-[100px] sm:h-[155px] h-[100px] ">
                <Image
                  src="/stamp.webp"
                  fill
                  alt="stamp"
                  className=" object-contain"
                />
              </div>
            </a>
          </div> */}
        </motion.div>
      </motion.div>
    </motion.div>
  </section>
);

export default Feedback;
