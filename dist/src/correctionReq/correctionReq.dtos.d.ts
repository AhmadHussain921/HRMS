export declare class CorrectionReqDto {
    readonly subject: string;
    readonly description: string;
    readonly status: number;
}
export declare class CorrectionReqRequestDto {
    data: CorrectionReqDto;
}
export declare class IdQuery {
    readonly id: string;
}
export declare class Id2Query {
    readonly id: string;
}
export declare class EIdQueryRequestDto {
    eid: IdQuery;
}
export declare class CRIDQueryRequestDto {
    crid: IdQuery;
}
export declare class ECRIDQueryRequestDto {
    eid: IdQuery;
    crid: Id2Query;
}
