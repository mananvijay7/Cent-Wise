import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import MainContainer from './components/MainContainer/MainContainer';
import styles1 from "./App.module.css";
import styles from "./components/CentwiseNavigator/CentwiseNavigator.module.css";
import Navbar from './components/Navbar/Navbar';
import LeftSidePanel from './components/LeftSidePanel/LeftSidePanel';
import { Signin } from "./components/Centwiselogin/Signin";
import { CreateAccount } from "./components/CentwiseAuth/CreateAccount";
import CentwiseNavigator from './components/CentwiseNavigator/CentwiseNavigator';

interface SigninProps {
  onFormSwitch: (formName: string) => void;
  onLogin: (isSignIn: boolean) => void;
}

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentForm, setCurrentForm] = useState<string>("signin");
  const [authorizationUrl, setAuthorizationUrl] = useState('');

  useEffect(() => {
    fetchAuthorizationUrl();
  }, []);

  const fetchAuthorizationUrl = async () => {
    try {
      
      const response = await fetch('http://localhost:5173/centwise/authorize');
      const data = await response.json();

      setAuthorizationUrl(data.authorizationUrl);
    } catch (error: any) {
      console.error('Error fetching authorization URL:', error.message);
    }
  };

  const handleAuthorization = () => {
    window.open(authorizationUrl);
  };

  const handleFormSwitch = (formName: string): void => {
    setCurrentForm(formName);
  };

  const handleLogin = (isSigIn: boolean) => {
    setIsLoggedIn(isSigIn);
    setCurrentForm("");
    handleAuthorization();
  };

  const handleLogout = (isSigIn: boolean) => {
    setIsLoggedIn(isSigIn);
  };


  return (
    <Router>

      {
        isLoggedIn ? (
          <div className={styles.container}>
            <div className={styles.navbar}>
              <Navbar />
            </div>
            <div className={styles.mainBody}>
              <div className={styles.leftSidePanel}>
                <LeftSidePanel />
              </div>
              <div className={styles.mainContainer}>
                <Routes>
                <Route path="/" element={<MainContainer title="Dashboard" />} />
                  <Route path="/dashboard" element={<MainContainer title="Dashboard" />} />
                  <Route path="/expenses" element={<MainContainer title="AllExpenses" />} />
                  <Route path="/groups" element={<MainContainer title="Group" />} />
                  <Route path="/friends" element={<MainContainer title="Dashboard" />} />
                </Routes>
              </div>

            </div>
          </div>
        ) : (
          <Signin onFormSwitch={handleFormSwitch} onLogin={handleLogin}/>
        )
      }

    </Router>

  );
};

export default App;
