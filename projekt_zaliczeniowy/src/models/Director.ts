 //mongoose document provides all this _id, timestaps etc
import mongoose, {Document, Schema} from "mongoose";


 export interface IDirector {
     name:string;
     surname:string;
 }

 //2 interface because i use IDirector as base to validation
 export interface IDirectorModel extends IDirector, Document {}

 const DirectorSchema: Schema = new Schema(
     {
         name:{type: String, required: true},
         surname: {type:String, required: true}
     },
     {
         versionKey: false
     }
 );

 export default mongoose.model<IDirectorModel>('Director', DirectorSchema);