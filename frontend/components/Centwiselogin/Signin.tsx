import React, { useState, ChangeEvent, FormEvent,useEffect  } from "react";
import googleLogo from "../../../public/images/GoogleLogo.png";
import styles from "../Centwiselogin/Centwiselogin.module.css";
import Image from '../../../public/images/CentwiseLogo.png';
import { useDispatch } from 'react-redux';
import { login } from '../../Store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export const Signin: React.FC = () => {
  useEffect(() => {
    document.body.classList.add(styles.bodyGradient);
    return () => {
      document.body.classList.remove(styles.bodyGradient);
    };
  }, []);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showForgotPassword] = useState<boolean>(false);
  //const dispatch = useDispatch();
  const navigate = useNavigate(); 


  /*const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    dispatch(login({ username: email }));
    navigate('/dashboard');
    e.preventDefault();
    
  };*/

  const handleLocalSignin = async (e: FormEvent<HTMLFormElement>) => {
    try{
      const response = await axios.get('/api/user/create-session')
      .then(() => console.log('User logged in through Local Strategy'));
      navigate('/api/dashboard');
      e.preventDefault();
    }catch(error: any){
      console.error('Error logging in through Local Strategy:', error.message);
    }
  };

  const handleGoogleOauth = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try{
      const response = await axios.get('/api/user/auth/google')
      .then(() => console.log('User logged in through Google'));
      navigate('/api/dashboard');
      e.preventDefault();
    }catch(error: any){
      console.error('Error logging in through Google OAuth:', error.message);
    }
  }

  /*const handleForgotPasswordClick = (): void => {
    alert("Enter your email Id");
  };*/



  return (
    <div className={styles.container}>
       <img className={styles.CentwiseImage1} src={Image} alt="Centwise Logo" />
      {showForgotPassword ? (
        <div>
          <form onSubmit={handleLocalSignin}>
            {/* <button type="button" onClick={handleBackToSignInClick}>Back to Sign In</button> */}
          </form>
        </div>
      ) : (
        <div>
          <p className={styles.heading}><h2>Sign in to account</h2></p>
  
          <button className={styles.signin} onClick={handleGoogleOauth}>
            <img className={styles.myimage} src={googleLogo} alt="Google Logo" />
            <b>Sign in with Google</b>
          </button>
  
          <div className={styles.Or}>OR</div>
  
          <form onSubmit={handleLocalSignin} method="POST">
            <input
              className={styles.email}
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email id"
              required
              id="email"
              name="email"
            />
            <br/><br/>
            <input
              className={styles.email}
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              required
              id="password"
              name="password"
            />
            <br/><br/>
            <button className={styles.startsignin} type="submit">Sign in</button>
          </form>
  
          <div className={styles.new}>
            <p className={styles.n1}><h2>New here?</h2></p>
            <p className={styles.text}><h2>Start journey with us.</h2></p>
            <button className={styles.submit} onClick={() => navigate("/api/user/signup")}>
              Create Account
            </button>
          </div>
          <button className={styles.forgotPassword} onClick={handleGoogleOauth}>Forgot Password?</button>
        </div>
      )}
  </div>
  )
      }