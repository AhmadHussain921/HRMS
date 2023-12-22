import * as mongoose from 'mongoose';
declare const LeaveReq: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    description: string;
    moduleNumber: number;
    duration: string;
    subject: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    description: string;
    moduleNumber: number;
    duration: string;
    subject: string;
}>> & mongoose.FlatRecord<{
    description: string;
    moduleNumber: number;
    duration: string;
    subject: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export default LeaveReq;
