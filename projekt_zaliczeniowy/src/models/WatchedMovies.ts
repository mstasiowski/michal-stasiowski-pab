import mongoose,{Document, Schema} from "mongoose";


let watchedMoviesSchema: Schema = new Schema ({
    username:{type: Schema.Types.ObjectId, required:true, ref:'User'},
    watched:{type: Array, required:true, ref:'Movie'},
},
{
    timestamps: false,
    versionKey:false
}
);

export default mongoose.model('userWatchedMovie', watchedMoviesSchema);