import User from '../models/UserSchema.js';

export const signup = async function(request, response){
      try {
        if (request.isAuthenticated()) {
          return response.redirect('/api/user/signin');
        }
        // Assuming you are using a templating engine (e.g., EJS) for rendering
        return response.render('user_sign_up');
      } catch (err) {
        // Handle errors appropriately
        console.error(err);
        response.status(500).send('Internal Server Error');
      }
    };

    export const create = async function(request, response){
      try{
          if(request.body.password != request.body.cnfpassword){
            request.flash('error', "Password doesn't match");
              return res.redirect('back');
          }
          let user = await User.findOne({email: request.body.email});
          if(!user){
              let crte = await User.create({
                  email: request.body.email,
                  password: request.body.password,
                  name: request.body.name,
                  ph_no: request.body.ph_no
              });
              request.flash('success', 'Account Registered');
              return response.redirect('/api/user/signin');
          }
      }catch(err){
          console.log('Error occurred while finding the user');
      }
  };


export const signin = function(request, response){
      try{
            if(request.isAuthenticated()){
                  return response.redirect('/api/user/dashboard');
              }
            //return response.render('user_sign_in');
            response.redirect('/api/user/signin');
      }catch(err){
            console.error(err);
            response.status(500).send('Internal Server Error');
      }
  };


export const createSession = function(request, response){
      request.flash('success', 'Logged In Successfully');
      return response.redirect('/api/dashboard');
  }
  
export const sessionDestroy = function(request, response){
      request.flash('success', 'Logged Out Successfully');
      request.logout();
      return response.redirect('/');
  };
