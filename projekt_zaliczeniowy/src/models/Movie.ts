import mongoose, {Document, Schema} from 'mongoose';

export interface IMovie {
    title:string;
    genre: string;
    description: string;
    production:string;
    director: string;
    script: string;
    premiere: string;
}

export interface IMovieModel extends IMovie, Document {}

const MovieSchema: Schema = new Schema({
    title:{type: String, required: true},
    genre:{type: Schema.Types.ObjectId, required:true, ref:'Genre'},
    description:{type: String, required: true},
    production:{type: Schema.Types.ObjectId, required:true, ref:'Production'},
    director:{type: Schema.Types.ObjectId, required:true, ref:'Director'},
    script:{type: Schema.Types.ObjectId, required:true, ref:'Scriptwriter'},
    premiere:{type: String, required: true}
    },
    {
        timestamps: true,
        versionKey: false
    }


);

export default mongoose.model<IMovieModel>('Movie', MovieSchema);