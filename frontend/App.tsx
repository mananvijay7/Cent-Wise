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
import InviteFriendsModal from './components/InviteFriendsModal/InvitefrndsModal';



const App: React.FC = () => {

const [authorizationUrl, setAuthorizationUrl] = useState('');
  
  useEffect(() => {
    // Perform any setup or side effects on component mount
    // For example, fetch the authorization URL from your server
    // when the component is mounted
    //console.log("coming here at app");
    //fetchAuthorizationUrl();
  }, []);

  /*const fetchAuthorizationUrl = async () => {
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

  const [isInviteFriendsModalOpen, setInviteFriendsModalOpen] = useState(false);
  
  const handleInviteFriendsClick = () => {
    setInviteFriendsModalOpen(!isInviteFriendsModalOpen);
  };

  return (
    <Router>
      <Routes>
       {/*<Route element={<ProtectedRoute/>}>*/}
          <Route path='/dashboard' element={<CentwiseNavigator title='Dashboard'/>}/>

          <Route path='/expenses' element={<CentwiseNavigator title='AllExpenses'/>}/>

          <Route path='/groups' element={<CentwiseNavigator title='Groups'/>}/>

          <Route path='/friends' element={<CentwiseNavigator title='Friends'/>}/>

          <Route path='/invitefriends' element={<InviteFriendsModal closeModal={handleInviteFriendsClick}/>}/>
        {/*</Route>*/}
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/user/signin' element={<CentwiseAuth type='signin'/>}/>
        <Route path='/user/signup' element={<CentwiseAuth type='signup'/>}/>
      </Routes>
    </Router>
  );
};

export default App;