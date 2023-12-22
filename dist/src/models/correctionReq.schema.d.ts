import * as mongoose from 'mongoose';
declare const CorrectionReq: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    description: string;
    moduleNumber: number;
    status: number;
    subject: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    description: string;
    moduleNumber: number;
    status: number;
    subject: string;
}>> & mongoose.FlatRecord<{
    description: string;
    moduleNumber: number;
    status: number;
    subject: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export default CorrectionReq;
