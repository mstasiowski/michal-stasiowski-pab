import mongoose,{Document, mongo, Schema} from "mongoose";

export interface IProduction {
    country: string;
}

export interface IProductionModel extends IProduction, Document{}

const ProductionSchema: Schema = new Schema({
    country:{type: String, required:true}
},
{
    versionKey:false
}


);


export default mongoose.model<IProductionModel>('Production',ProductionSchema);