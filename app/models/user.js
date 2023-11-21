//Creating User Schema
import mongoose, { trusted } from "mongoose";

const Schema = mongoose.Schema;

//Creating user schema using mongoose
const UserSchema = new Schema({
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    f_name: {
        type: String,
        required: true
    },
    l_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    ph_no: {
        type: String,
        required: true
    }
},
{
    versionKey: false
});

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;