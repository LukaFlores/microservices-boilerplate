import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Fade from 'react-reveal/Fade';
import Swing from 'react-reveal/Swing';
import OnImagesLoaded from 'react-on-images-loaded';

import Dashboard from './features/Dashboard';
import { ContextInteface } from './components/PrivateRoute';
import { AuthContext } from './tools/authContext';
import Homepage from './features/Homepage';
import SignIn from './features/SignIn';
import Login from './features/Login';
import Loading from './components/Loading';

const App: React.FC<{}> = (props) => {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const { isAuthenticated, isLoading } = useContext<ContextInteface>(AuthContext);

  useEffect(() => {
    if (isLoading === true) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading]);

  return (
    <div>
      {showLoader ? <Loading loading={true} /> : null}

      {loading === false && (
        <div className="flex flex-row z-30 bg-white">
          <div className="antialiased font-sans h-full min-h-screen w-full">
            <main className="" id="main">
              <Fade key={location.pathname} appear duration={300} collapse>
                <Routes>
                  <Route path="/" element={<Dashboard loading={showLoader} />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route
                    path="/homepage"
                    element={
                      isLoading === false &&
                      (isAuthenticated === true ? <Homepage /> : <Navigate to="/" />)
                    }
                  />
                </Routes>
              </Fade>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
