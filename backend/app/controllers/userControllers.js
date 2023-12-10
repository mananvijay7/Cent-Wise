import User from '../models/UserSchema.js';

    export const create = async function(request, response){
      console.log(request);
      try{
          let user = await User.findOne({email: request.body.email});
          if(!user){
              let crte = await User.create({
                  email: request.body.email,
                  password: request.body.password,
                  first_name: request.body.first_name,
                  last_name: request.body.last_name,
                  ph_no: request.body.ph_no,
              });
              request.flash('success', 'Account Registered');
              return response.status(200).json({message: "User Created"});
          }else{
            return response.status(400).json({message: "User Already exist!"});
          }
      }catch(err){
          console.log('Error occurred while finding the user');
          return response.status(404).json({message: "Error occured"});
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
    console.log(response);
    return response.status(200).send('User logged in');
}


export const createSession = function(request, response){
      request.flash('success', 'Logged In Successfully');
      //console.log('reached create session ' + "request " + request + "response " + response);
      return response.redirect('/dashboard');
  }
  
  export const sessionDestroy = function(request, response) {
    console.log("I'm in session destrroy");
    console.log(request.session);

    request.session.destroy(err => {
        if (err) {
          console.error('Error destroying session:', err);
          response.sendStatus(500);
        } else {
          // Redirect the user to the login page or any other page
          //req.flash('success', 'Logged Out Successfully');
          return response.status(200).send('Logged Out Successfully');
        }
      });
};
