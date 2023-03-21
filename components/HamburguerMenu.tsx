import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "tailwindcss/tailwind.css";

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  const handleHamburgerClick = () => {
    toggleOpen();
  };

  useEffect(() => {
    const currentOverlay = overlayRef.current;

    if (open && currentOverlay) {
      currentOverlay.addEventListener("click", handleClickOutside);
    } else if (currentOverlay) {
      currentOverlay.removeEventListener("click", handleClickOutside);
    }

    return () => {
      if (currentOverlay) {
        currentOverlay.removeEventListener("click", handleClickOutside);
      }
    };
  }, [open]);

  const drawerVariants = {
    open: { x: 0 },
    closed: { x: "+100%" },
  };

  const buttonVariants = {
    open: { zIndex: 60 },
    closed: { zIndex: 10 },
  };

  const lineBackgroundColor = open ? "bg-black" : "bg-white";

  return (
    <>
      <div className="flex flex-col justify-center">
        <AnimatePresence>
          <motion.button
            onClick={handleHamburgerClick}
            className="relative group"
            initial="closed"
            animate={open ? "open" : "closed"}
            variants={buttonVariants}
          >
            <div
              className={`relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all duration-200`}
            >
              <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center ">
                <div
                  className={`${lineBackgroundColor} h-[2px] w-7 transform transition-all duration-300 origin-left ${
                    open ? "rotate-[42deg]" : ""
                  }`}
                ></div>
                <div
                  className={`${lineBackgroundColor} h-[2px] w-1/2 rounded transform transition-all duration-300 ${
                    open ? "-translate-x-10" : ""
                  }`}
                ></div>
                <div
                  className={`${lineBackgroundColor} h-[2px] w-7 transform transition-all duration-300 origin-left ${
                    open ? "-rotate-[42deg]" : ""
                  }`}
                ></div>
              </div>
            </div>
          </motion.button>
        </AnimatePresence>
      </div>

      <motion.div

        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-[50%] bg-gray-200 p-4 shadow-xl z-50 transition-all duration-300 ease-in-out"
        initial="closed"
        animate={open ? "open" : "closed"}
        variants={drawerVariants}
      >
      </motion.div>
    </>
  );
};

export default HamburgerMenu
