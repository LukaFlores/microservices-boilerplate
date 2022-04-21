import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './features/Dashboard';
import { ContextInteface } from './components/PrivateRoute';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthContext } from './tools/authContext';
import Homepage from './features/Homepage';
import SignIn from './features/SignIn';
import Loading from './components/Loading';

const App: React.FC<{}> = (props) => {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const { isAuthenticated, isLoading } = useContext<ContextInteface>(AuthContext);

  return (
    <div>
      <Loading setLoading={setShowLoader} loadingState={showLoader} />
      {/* RACE CONDITION NEEDS TO BE FIXED, NOT DEPENDED ON CONTEXT LOADING */}
      <AnimatePresence exitBeforeEnter={true} initial={false}>
        <div className="flex flex-row z-30 bg-white">
          <div className="antialiased font-sans h-full min-h-screen w-full">
            <main className="" id="main">
              <Routes>
                <Route path="/" element={<Dashboard loading={showLoader} />} />
                <Route path="/signin" element={<SignIn />} />
                <Route
                  path="/homepage"
                  element={
                    isLoading === false &&
                    (isAuthenticated === true ? <Homepage /> : <Navigate to="/signin" />)
                  }
                />
              </Routes>
            </main>
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default App;
