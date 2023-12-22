import * as mongoose from 'mongoose';
declare const Skills: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    moduleNumber: number;
    skillName?: string;
    duration?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    moduleNumber: number;
    skillName?: string;
    duration?: string;
}>> & mongoose.FlatRecord<{
    moduleNumber: number;
    skillName?: string;
    duration?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export default Skills;
