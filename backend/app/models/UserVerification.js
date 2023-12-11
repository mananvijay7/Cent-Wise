import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserVerificationSchema = new Schema({
  userId:{
    type: String,
 },
  uniqueString: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  expiredAt: {
    type: Date,
  },

});

const UserVerification = mongoose.model('UserVerification', UserVerificationSchema);

export default UserVerification;