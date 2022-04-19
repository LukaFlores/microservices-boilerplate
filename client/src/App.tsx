import React, { useContext, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Fade from 'react-reveal/Fade';
import Swing from 'react-reveal/Swing';
import OnImagesLoaded from 'react-on-images-loaded';

import Dashboard from './features/Dashboard';
import { ContextInteface } from './components/PrivateRoute';
import { AuthContext } from './tools/authContext';
import Homepage from './features/Homepage';

const App: React.FC<{}> = (props) => {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const { isAuthenticated, isLoading } = useContext<ContextInteface>(AuthContext);

  return (
    <div>
      {showLoader ? (
        <div
          className={`fixed z-50 loader w-screen h-screen flex justify-center bg-white items-center transition duration-500 ease-in-out ${
            loading ? 'opacity-100' : 'opacity-0'
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
      ) : null}

      <OnImagesLoaded
        onLoaded={() => {
          setTimeout(() => {
            setLoading(false);
            setTimeout(() => {
              setShowLoader(false);
            }, 500);
          }, 1000);
        }}
        onTimeout={() => {
          setLoading(false);
          setTimeout(() => {
            setShowLoader(false);
          }, 500);
        }}
        timeout={7000}
      >
        <div className="flex flex-row z-30 bg-white">
          <div className="antialiased font-sans h-full min-h-screen w-full">
            <main className="" id="main">
              <Fade key={location.pathname} appear duration={300} collapse>
                <Routes>
                  <Route
                    path="/homepage"
                    element={isAuthenticated ? <Homepage /> : <Navigate to="/" />}
                  />
                  <Route path="/" element={<Dashboard loading={showLoader} />} />
                </Routes>
              </Fade>
            </main>
          </div>
        </div>
      </OnImagesLoaded>
    </div>
  );
};

export default App;
