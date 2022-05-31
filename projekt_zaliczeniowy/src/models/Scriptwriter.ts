import mongoose, { Schema } from "mongoose";

export interface IScriptwriter {
    name: string;
    surname:string;
}

export interface IScriptwriterModel extends IScriptwriter, Document {}

const ScriptwriterShema: Schema = new Schema ({
    name:{type:String, required: true},
    surname:{type:String, required: true}
},
{
    versionKey: false
}
);

export default mongoose.model<IScriptwriterModel>('Scriptwriter', ScriptwriterShema);