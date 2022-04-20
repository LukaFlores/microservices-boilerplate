import React, { FC } from 'react';
import Fade from 'react-reveal/Fade';
import Swing from 'react-reveal/Swing';

const Loading: FC<{ loading: boolean }> = (props) => {
  return (
    <div
      className={`fixed z-50 loader w-screen h-screen flex justify-center bg-white items-center transition duration-500 ease-in-out ${
        props.loading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div>
        <Fade bottom>
          <Swing forever>
            <div>Loading...</div>
          </Swing>
        </Fade>
      </div>
    </div>
  );
};

export default Loading;
