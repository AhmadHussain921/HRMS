import * as mongoose from 'mongoose';
declare const Department: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    EID: mongoose.Types.ObjectId[];
    name: string;
    profileImg: string;
    contact: string;
    email: string;
    moduleNumber: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    EID: mongoose.Types.ObjectId[];
    name: string;
    profileImg: string;
    contact: string;
    email: string;
    moduleNumber: number;
}>> & mongoose.FlatRecord<{
    EID: mongoose.Types.ObjectId[];
    name: string;
    profileImg: string;
    contact: string;
    email: string;
    moduleNumber: number;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export default Department;
