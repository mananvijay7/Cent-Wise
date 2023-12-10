import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from "./Utilities/ProtectedRoute";
import CentwiseNavigator from './components/CentwiseNavigator/CentwiseNavigator';
import LandingPage from './components/LandingPage/LandingPage';
import { Provider } from 'react-redux';
import store from './Store/index';
import Views from './Utilities/Views';
import styles from "./components/CentwiseNavigator/CentwiseNavigator.module.css";
import MainContainer from './components/MainContainer/MainContainer';
import LeftSidePanel from './components/LeftSidePanel/LeftSidePanel';
import Navbar from './components/Navbar/Navbar';
import axios from 'axios';
import CentwiseAuth from './components/CentwiseAuth/CentwiseAuth';


const App: React.FC = () => {

  /*const [authorizationUrl, setAuthorizationUrl] = useState('');
  
  useEffect(() => {
    // Perform any setup or side effects on component mount
    // For example, fetch the authorization URL from your server
    // when the component is mounted
    fetchAuthorizationUrl();
  }, []);

  const fetchAuthorizationUrl = async () => {
    try {
      // Fetch the authorization URL from your server
      const response = await axios.get('/api/user/signin');
      const data = await response.data;
      console.log(data + " datataatatat");

      //setAuthorizationUrl(data.authorizationUrl);
    } catch (error: any) {
      console.error('Error fetching authorization URL:', error.message);
    }
  };

  const handleAuthorization = () => {
    window.open(authorizationUrl);
  };

  handleAuthorization();*/

  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute/>}>
          <Route path='/api/dashboard' element={<CentwiseNavigator title='Dashboard'/>}/>
          <Route path='/api/expenses' element={<CentwiseNavigator title='AllExpenses'/>}/>
          <Route path='/api/groups' element={<CentwiseNavigator title='Groups'/>}/>
          <Route path='/api/friends' element={<CentwiseNavigator title='Dashboard'/>}/>
        </Route>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/api/user/signin' element={<CentwiseAuth type='signin'/>}/>
        <Route path='/api/user/signup' element={<CentwiseAuth type='signup'/>}/>
      </Routes>
    </Router>
  );
};

export default App;