import * as mongoose from 'mongoose';
declare const Trainings: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    moduleNumber: number;
    description?: string;
    trainingName?: string;
    instituteName?: string;
    tariningDuration?: string;
    outcomeDetails?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    moduleNumber: number;
    description?: string;
    trainingName?: string;
    instituteName?: string;
    tariningDuration?: string;
    outcomeDetails?: string;
}>> & mongoose.FlatRecord<{
    moduleNumber: number;
    description?: string;
    trainingName?: string;
    instituteName?: string;
    tariningDuration?: string;
    outcomeDetails?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export default Trainings;
