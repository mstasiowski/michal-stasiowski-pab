import mongoose,{Document, Schema} from "mongoose";

export interface IUser {

    username: string;
    password: string;
    email: string;
}

export interface IUserModel extends IUser, Document{}

const UserSchema: Schema = new Schema(
    {
        username:{type: String,required:true, unique:true},
        password:{type: String,required:true},
        email:{type: String,required:true, unique:true},


    }
)

export default mongoose.model<IUserModel>('User', UserSchema);