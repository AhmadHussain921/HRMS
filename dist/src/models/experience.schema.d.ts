import * as mongoose from 'mongoose';
declare const Experience: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    moduleNumber: number;
    SKID: mongoose.Types.ObjectId[];
    PJID: mongoose.Types.ObjectId[];
    TRID: mongoose.Types.ObjectId[];
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    moduleNumber: number;
    SKID: mongoose.Types.ObjectId[];
    PJID: mongoose.Types.ObjectId[];
    TRID: mongoose.Types.ObjectId[];
}>> & mongoose.FlatRecord<{
    moduleNumber: number;
    SKID: mongoose.Types.ObjectId[];
    PJID: mongoose.Types.ObjectId[];
    TRID: mongoose.Types.ObjectId[];
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export default Experience;
