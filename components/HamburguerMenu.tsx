import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import "tailwindcss/tailwind.css";

const HamburgerMenu = () => {
  const controls = useAnimation();
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      controls.start("closed");
    } else {
      controls.start("open");
    }
  };

  const buttonVariants = {
    open: {
      translateY: 6,
      transition: { duration: 0.3 },
    },
    closed: {
      translateY: 0,
      transition: { duration: 0.3 },
    },
  };

  const crossVariants = {
    open: {
      rotate: [0, 45],
      transition: { duration: 0.5 },
    },
    closed: {
      rotate: [-45, 0],
      transition: { duration: 0.5 },
    },
  };

  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      drawerRef.current &&
      !drawerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const drawerVariants = {
    open: { x: 0 },
    closed: { x: "+100%" },
  };

  return (
    <>
      <button onClick={handleButtonClick} className="relative group">
        <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
          <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
            {["", "", ""].map((_, i) => (
              <motion.div
                key={i}
                className="bg-white h-[2px] w-7"
                animate={controls}
                variants={buttonVariants}
              />
            ))}
            <div className="absolute items-center justify-between transform transition-all duration-500 top-2.5 -translate-x-10 group-focus:translate-x-0 flex w-0 group-focus:w-12">
              {["", ""].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white h-[2px] w-5"
                  animate={controls}
                  variants={crossVariants}
                />
              ))}
            </div>
          </div>
        </div>
      </button>

      <motion.div
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-[50%] bg-gray-200 p-4 shadow-xl z-50 transition-all duration-300 ease-in-out"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={drawerVariants}
      ></motion.div>
    </>
  );
};

export default HamburgerMenu;
