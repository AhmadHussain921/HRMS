import * as mongoose from 'mongoose';
declare const PrevJobs: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    moduleNumber: number;
    salary: number;
    jobTitle?: string;
    companyName?: string;
    companyContact?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    moduleNumber: number;
    salary: number;
    jobTitle?: string;
    companyName?: string;
    companyContact?: string;
}>> & mongoose.FlatRecord<{
    moduleNumber: number;
    salary: number;
    jobTitle?: string;
    companyName?: string;
    companyContact?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export default PrevJobs;
