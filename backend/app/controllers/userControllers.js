import User from '../models/UserSchema.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import nodemailer from 'nodemailer';

import 'dotenv/config'

let transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  }
});

export const create = async function(request, response){
  //console.log(request);
  try{
    const uploadedFile = request.file;
      let user = await User.findOne({email: request.body.email});
      if(!user){
          let crte = await User.create({
              email: request.body.email,
              password: request.body.password,
              first_name: request.body.first_name,
              last_name: request.body.last_name,
              ph_no: request.body.ph_no,
          });
      // Add the uploaded file data to the user model if needed
      if (uploadedFile) {
        createUser.profilePicture = {
          data: uploadedFile.buffer,
          contentType: uploadedFile.mimetype,
        };
        await createUser.save(); // Save the user model with the updated profilePicture field
      }

          //request.flash('success', 'Account Registered');
          return response.status(200).json({message: "User Created"});
      }else{
        return response.status(400).json({message: "User Already exists!"});
      }
  }catch(err){
      console.log('Error occurred while finding/creating the user');
      return response.status(404).json({message: "Error occured"});
  }
};



export const forgotPassword = async function (request, response) {
  try {
    const { email } = request.body;
    const user = await User.findOne({ email });

    if (!user) {
      return response.status(404).json({
        message: 'User not found with this email address.',
      });
    }

    const resetLink = `http://your-domain.com/user/reset-password/${resetToken}`;

    const emailTo = email; 
    const emailContent = `Click the following link to reset your password: ${resetLink}`;

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: emailTo,
      subject: 'Password Reset',
      text: emailContent,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return response.status(500).json({
          message: 'Error sending password reset email.',
        });
      } else {
        console.log('Password reset email sent: ' + info.response);
        return response.status(200).json({
          message: 'Password reset email sent. Check your inbox.',
        });
      }
    });
   
  } catch (error) {
    console.error('Error occurred during forgot password:', error);
    return response.status(500).json({
      message: 'Internal Server Error',
    });
  }
};




export const signin = function(request, response){
      try{
            if(request.isAuthenticated()){
                  return response.redirect('/dashboard');
              }
            //return response.render('user_sign_in');
            response.redirect('/user/signin');
      }catch(err){
            console.error(err);
            response.status(500).send('Internal Server Error');
      }
  };

  export const localLogin = function(request, response){
    request.flash('success', 'Logged In Successfully');
    //console.log(response);
    return response.status(200).send('User logged in');
}


export const createSession = function(request, response){
      request.flash('success', 'Logged In Successfully');
      //console.log('reached create session ' + "request " + request + "response " + response);
      return response.redirect('/dashboard');
  }
  
  export const sessionDestroy = function(request, response) {
    console.log("I'm in session destrroy");
    //console.log(request.session);
    //req.flash('success', 'Logged Out Successfully');
    request.session.destroy(err => {
        if (err) {
          console.error('Error destroying session:', err);
          response.sendStatus(500);
        } else {
          return response.status(200).send('Logged Out Successfully');
        }
      });
};

export const checkAuth = function(request, response) {
  try{
    //console.log(request);
    if(request.isAuthenticated()){
      return response.status(200).send('User Authenticated');
      }
    //return response.render('user_sign_in');
    return response.status(404).send('User not Authenticated');
}catch(err){
    console.error(err);
    response.status(500).send('Internal Server Error');
}
};