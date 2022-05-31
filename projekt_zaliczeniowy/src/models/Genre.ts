import mongoose,{Document, Schema} from "mongoose";

export interface IGenre {
    name:string;
}

export interface IGenreModel extends IGenre, Document{}

const GenreSchema: Schema = new Schema ({
    name:{type:String, required: true, unique: true}
},
{
    versionKey:false
}
);

export default mongoose.model<IGenreModel>('Genre', GenreSchema);
