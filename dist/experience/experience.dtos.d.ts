export declare class SkillsDto {
    readonly skillName: string;
    readonly duration: string;
}
export declare class PrevJobDto {
    readonly jobTitle: string;
    readonly companyName: string;
    readonly companyContact: string;
    readonly salary: number;
}
export declare class TrainingDto {
    readonly trainingName: string;
    readonly instituteName: string;
    readonly description: string;
    readonly tariningDuration: string;
    readonly outcomeDetails: string;
}
export declare class IdQuery {
    readonly contact: string;
}
export declare class AddExpReqDto {
    skills: [SkillsDto];
    prevJobs: [PrevJobDto];
    trainings: [TrainingDto];
}
export declare class SkillReqDto {
    skill: SkillsDto;
}
export declare class PrevJobReqDto {
    prevJob: PrevJobDto;
}
export declare class TrainingReqDto {
    training: TrainingDto;
}
export declare class EIdQueryRequestDto {
    id: IdQuery;
}
export declare class SIdQueryRequestDto {
    sid: IdQuery;
}
export declare class PJIdQueryRequestDto {
    pjid: IdQuery;
}
export declare class TIdQueryRequestDto {
    tid: IdQuery;
}
export declare class ESIdQueryRequestDto {
    skid: IdQuery;
    eid: IdQuery;
}
