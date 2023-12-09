import dashboardServices from '../services/dashboard-services';

export const fetchAllData = async function(request, response){
      try{
            if(request.isAuthenticated()){
                  const userId = request.user._id;
                  const userData = dashboardServices.fetchUserData(userId);
                  if(!userData){
                        return response.status(404).json({ error: 'User not found' });
                  }
                  return userData.json();
            }
            alert('Login to use CentWise');
            return response.redirect('/api/user/signin');
      }catch(error){

      }
};
