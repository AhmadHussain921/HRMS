import * as mongoose from 'mongoose';
declare const Designation: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    moduleNumber: number;
    salary: number;
    deptName: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    moduleNumber: number;
    salary: number;
    deptName: string;
}>> & mongoose.FlatRecord<{
    name: string;
    moduleNumber: number;
    salary: number;
    deptName: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export default Designation;
