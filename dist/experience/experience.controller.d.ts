import { Response, Request } from 'express';
import { Model } from 'mongoose';
import { EmployeeService } from '../employee/employee.service';
import { ExperienceService } from './experience.service';
import { AddExpReqDto, SkillReqDto, SIdQueryRequestDto, EIdQueryRequestDto } from './experience.dtos';
export declare class ExperienceController {
    private Experience;
    private Skills;
    private PrevJobs;
    private Trainings;
    private readonly employeeService;
    private readonly experienceService;
    constructor(Experience: Model<any>, Skills: Model<any>, PrevJobs: Model<any>, Trainings: Model<any>, employeeService: EmployeeService, experienceService: ExperienceService);
    allExperiences(req: Request, res: Response): Promise<void>;
    myExperience(req: any, res: Response): Promise<void>;
    addExperience(req: any, res: Response, body: AddExpReqDto, query: EIdQueryRequestDto): Promise<Response<any, Record<string, any>>>;
    updateExperience(req: any, res: Response, body: AddExpReqDto, query: any): Promise<void>;
    editSkills(req: any, res: Response, body: SkillReqDto, query: SIdQueryRequestDto): Promise<void>;
    editPrevJobs(req: any, res: Response, query: any, body: any): Promise<void>;
    editTrainings(req: any, res: Response, query: any, body: any): Promise<void>;
    removeSkill(req: any, res: Response, query: any): Promise<void>;
    removePrevJob(req: any, res: Response, query: any): Promise<void>;
    removeTraining(req: any, res: Response, query: any): Promise<void>;
    deleteExperience(req: any, res: Response, query: any): Promise<void>;
}
