import * as mongoose from 'mongoose';
declare const TimeAndAttendance: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    moduleNumber: number;
    presentHours: string[];
    presentHoursTimeStamp: Date;
    breakHour: string[];
    breakHourTimestamp: Date;
    LRID?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    moduleNumber: number;
    presentHours: string[];
    presentHoursTimeStamp: Date;
    breakHour: string[];
    breakHourTimestamp: Date;
    LRID?: mongoose.Types.ObjectId;
}>> & mongoose.FlatRecord<{
    moduleNumber: number;
    presentHours: string[];
    presentHoursTimeStamp: Date;
    breakHour: string[];
    breakHourTimestamp: Date;
    LRID?: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export default TimeAndAttendance;
