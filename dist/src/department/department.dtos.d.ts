export declare class CreateDeptDto {
    readonly name: string;
    readonly profileImg: string;
    readonly contact: string;
    readonly email: string;
}
export declare class UpdateDeptDto {
    readonly name: string;
    readonly profileImg: string;
    readonly contact: string;
    readonly email: string;
    readonly emergencyContact: string;
    readonly EID: any;
}
export declare class UpdateDeptRequestDto {
    data: {
        UpdateDeptDto: any;
        EID: any;
    };
}
export declare class IdQuery {
    readonly contact: string;
}
export declare class IdQueryRequestDto {
    id: IdQuery;
}
