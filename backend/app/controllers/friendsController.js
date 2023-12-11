import * as friendService from '../services/friends-services.js';
import User from '../models/UserSchema.js';


export const addFriend = async function(request, response){
      try{
            const userId = request.params.userId;
            const user = await friendService.findUserById(userId);
            const userTobeAdded = await friendService.findUser(request.body.email);

            if(userTobeAdded){
                  const newFriend = {
                        friend: userTobeAdded._id, // Assuming friendId is the ID of the new friend's user
                        amountInDeal: userTobeAdded.amountInDeal || 0,
                        friend_first_name: userTobeAdded.friendFirstName,
                        friend_last_name: userTobeAdded.friendLastName,
                      };

                      user.friends.push(newFriend); // Add the new friend to the user's friends array
                      await user.save(); // Save the updated user

                      return response.status(200).json({ message: 'Friend added successfully', user });
            }else{
                 return response.status(500).json({ message: 'No user with the given email exists', user });
            }
      }catch(error){
            return response.status(501).json({ message: 'Error adding friend', error: error.message });
      }
};