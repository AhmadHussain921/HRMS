export declare class DesignationDto {
    readonly name: string;
    readonly deptName: string;
    readonly salary: string;
}
export declare class DesgReqDto {
    data: DesignationDto;
}
export declare class IdQuery {
    readonly id: string;
}
export declare class EIdQueryReqDto {
    eid: IdQuery;
}
export declare class DESGIdQueryReqDto {
    desgId: IdQuery;
}
export declare class EDESGIdQueryReqDto {
    eid: IdQuery;
    desgId: IdQuery;
}
