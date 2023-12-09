import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import googleLogo from "../../../public/images/GoogleLogo.png";
import styles from "../Centwiselogin/Centwiselogin.module.css";
import Image from '../../../public/images/CentwiseLogo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



export const CreateAccount: React.FC = () => {
  useEffect(() => {
    document.body.classList.add(styles.bodyGradient);
    return () => {
      document.body.classList.remove(styles.bodyGradient);
    };
  }, []);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string | null>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [passwordRequirementsVisible, setPasswordRequirementsVisible] = useState<boolean>(false);

  const validatePassword = (password: string): boolean => {
    // Password must be at least 8 characters long
    // It must contain at least one uppercase letter, one lowercase letter, and one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };
  const handlePasswordFocus = (): void => {
    setPasswordRequirementsVisible(true);
  };

  const handlePasswordBlur = (): void => {
    setPasswordRequirementsVisible(false); 
  };


  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setConfirmPassword(value);
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>): void => {
    // To ensure that the entered value is numeric and has exactly 10 digits
    const value = e.target.value.trim();
    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber(value === '' ? null : value);
    }
  };
  const toggleShowPassword = (): void => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleConfirmShowPassword = (): void => {
    setShowConfirmPassword((prevConfirmShowPassword) => !prevConfirmShowPassword);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!validatePassword(password)) {
      alert("Invalid password! Please follow the password requirements.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please enter matching passwords.");
      return;
    }

  };

  const handleGoogleOauth = async (e: React.MouseEvent<HTMLImageElement>) => {
    try{
      const response = await axios.get('/api/user/auth/google')
      .then(() => console.log('User logged in through Google'));
      navigate('/api/dashboard');
      e.preventDefault();
    }catch(error: any){
      console.error('Error logging in through Google OAuth:', error.message);
    }
  };

  const handleLocalSignup = async (e: FormEvent<HTMLFormElement>) => {
    try{
      const response = await axios.get('/api/user/signup')
      .then(() => console.log('User account created through Local Strategy'));
      navigate('/api/user/signin');
      e.preventDefault();
    }catch(error: any){
      console.error('Error creating account in through Local Strategy:', error.message);
    }
  };

  return (



    <div className={styles.container2}>
      <img className={styles.CentwiseImage} src={Image} alt="Centwise Logo" />

        <div>
          <p className={styles.headSignup}><h2>Sign up to account</h2></p>
        </div>

        <button className={styles.signin}> < img className={styles.myimage} src={googleLogo} onClick={handleGoogleOauth} />
          <b>Sign up with Google</b>
        </button>
        <div className={styles.Or}>OR</div>

      <form onSubmit={handleLocalSignup} method="POST">
        <input className={styles.email} value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" placeholder="Enter your full name" required id="firstName" name='name'/>
        <br /><input className={styles.email} value={phoneNumber || ''} onChange={handlePhoneNumberChange} type="tel" placeholder="Enter your phone number" required id="phoneNo" name='ph_no' />
        <br /><input className={styles.email} value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email id" required id="email" name='email'/>
        <br /> <input className={styles.email} value={password} onChange={handlePasswordChange} onFocus={handlePasswordFocus}
          onBlur={handlePasswordBlur} type={showPassword ? "text" : "password"} placeholder="Enter your password" required id="password" name='password'/>
        <button className={styles.showpassword} type="button" onClick={toggleShowPassword}>{showPassword ? "Hide" : "Show"} Password</button>
        {passwordRequirementsVisible && (
          <ul className={styles.passwordRequirements}>
            <li>Password must be at least 8 characters long</li>
            <li>Contain at least one uppercase letter</li>
            <li>Contain at least one lowercase letter</li>
            <li>Contain at least one number</li>
          </ul>
        )}
        <br /><input className={styles.email} value={confirmPassword} onChange={handleConfirmPasswordChange} type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" required id="confirmPassword" name='cnfPassword'/>
        <button className={styles.showconfirmpassword} type="button" onClick={toggleConfirmShowPassword}>{showConfirmPassword ? "Hide" : "Show"} Password</button>
        <br /><button className={styles.signup} type="submit">Sign Up</button>
      </form>
      <div className={styles.new2}>
        <p className={styles.n2}><h2>Existing User?</h2></p>
        <p className={styles.text2}><h2>Sign in to your account.</h2></p>
        <button className={styles.submit2} onClick={() => navigate('/api/user/signin')}>Sign In</button>
      </div>
    </div>
  );
};
