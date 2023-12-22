import { Model } from 'mongoose';
export declare class ExperienceService {
    private Experience;
    private Skills;
    private PrevJobs;
    private Trainings;
    constructor(Experience: Model<any>, Skills: Model<any>, PrevJobs: Model<any>, Trainings: Model<any>);
    giveMyExperience(exid: any): Promise<any>;
    giveMySkill(skid: any): Promise<any>;
    giveMyTraining(tid: any): Promise<any>;
    giveMyPrevJob(pjid: any): Promise<any>;
    delMyPrevJob(pjid: any): Promise<any>;
    delMySkill(skid: any): Promise<any>;
    delMyTraining(tid: any): Promise<any>;
    delMyExperience(exid: any): Promise<any>;
}
