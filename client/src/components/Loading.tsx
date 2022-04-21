import React, { FC } from 'react';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal/Fade';
import { AnimatePresence, motion } from 'framer-motion';

const Loading: FC<{ setLoading: any; loadingState: any }> = (props) => {
  return (
    <AnimatePresence initial={false}>
      {props.loadingState && (
        <motion.div
          key="IDUNIAED"
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.4,
            ease: 'easeInOut',
          }}
        >
          <div
            className={`fixed z-50 loader w-screen h-screen flex justify-center bg-black items-center transition duration-500 ease-in-out opacity-100`}
          >
            <div>
              <div className="text-2xl text-white">
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString('Luka Flores...')
                      .callFunction(() => {})
                      .pauseFor(500)
                      .deleteAll()
                      .callFunction(() => {
                        props.setLoading(false);
                      })
                      .start();
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;
