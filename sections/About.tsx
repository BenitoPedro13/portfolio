"use client";

import { motion } from "framer-motion";
import { TypingText } from "../components";
import styles from "../styles";
import { fadeIn, staggerContainer } from "../utils/motion.js";

const About = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <div className="gradient-02 z-0" />
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="| Sobre Mim" textStyles="text-center" />

      <motion.p
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
      >
        Com habilidades avançadas em{" "}
        <span className="font-extrabold text-white">
          desenvolvimento Frontend
        </span>{" "}
        e <span className="font-extrabold text-white">Backend</span>, sou capaz
        de criar soluções integradas e{" "}
        <span className="font-extrabold text-white">escaláveis</span>, que
        atendem às necessidades específicas dos meus clientes. Meu foco em desenvolvimento web com {" "} 
        <span className="font-extrabold text-white">
          Nextjs, TypeScript e Reactjs
        </span>{" "}
        tem me permitido alcançar excelentes resultados em termos de{" "}
        <span className="font-extrabold text-white">qualidade</span> e{" "}
        <span className="font-extrabold text-white">eficiência</span>. Como um{" "}
        desenvolvedor web comprometido com a excelência, estou sempre buscando
        maneiras de melhorar minhas habilidades e expandir minha experiência ,
        buscando{" "}
        <span className="font-extrabold text-white">aprendizado contínuo</span>{" "}
        e aplicando as{" "}
        <span className="font-extrabold text-white">
          mais recentes tecnologias
        </span>{" "}
        para entregas cada vez{" "}
        <span className="font-extrabold text-white">mais eficientes</span> e de{" "}
        <span className="font-extrabold text-white">alta qualidade</span>.
      </motion.p>

      <motion.img
        variants={fadeIn("up", "tween", 0.3, 1)}
        src="/arrow-down.svg"
        alt="arrow down"
        className="w-[18px] h-[28px] object-contain mt-[28px]"
      />
    </motion.div>
  </section>
);

export default About;
