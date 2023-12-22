import * as mongoose from 'mongoose';
declare const Employee: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    CRID: mongoose.Types.ObjectId[];
    name: string;
    profileImg: string;
    contact: string;
    email: string;
    moduleNumber: number;
    fatherName: string;
    cnic: string;
    password: string;
    role: number;
    moduleAccess: number[];
    status: number;
    emergencyContact?: string;
    EXID?: mongoose.Types.ObjectId;
    DESGID?: mongoose.Types.ObjectId;
    TAID?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    CRID: mongoose.Types.ObjectId[];
    name: string;
    profileImg: string;
    contact: string;
    email: string;
    moduleNumber: number;
    fatherName: string;
    cnic: string;
    password: string;
    role: number;
    moduleAccess: number[];
    status: number;
    emergencyContact?: string;
    EXID?: mongoose.Types.ObjectId;
    DESGID?: mongoose.Types.ObjectId;
    TAID?: mongoose.Types.ObjectId;
}>> & mongoose.FlatRecord<{
    CRID: mongoose.Types.ObjectId[];
    name: string;
    profileImg: string;
    contact: string;
    email: string;
    moduleNumber: number;
    fatherName: string;
    cnic: string;
    password: string;
    role: number;
    moduleAccess: number[];
    status: number;
    emergencyContact?: string;
    EXID?: mongoose.Types.ObjectId;
    DESGID?: mongoose.Types.ObjectId;
    TAID?: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export default Employee;
