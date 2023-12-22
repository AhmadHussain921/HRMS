export declare class CreateUserDto {
    readonly name: string;
    readonly fatherName: string;
    readonly cnic: string;
    readonly profileImg: string;
    readonly contact: string;
    readonly emergencyContact: string;
    readonly email: string;
    readonly password: string;
    readonly did: string;
    readonly role: number;
    readonly moduleAccess: [];
}
export declare class AuthUserDto {
    readonly email: string;
    readonly password: string;
}
export declare class UpdateUserDto {
    readonly name: string;
    readonly fatherName: string;
    readonly cnic: string;
    readonly profileImg: string;
    readonly contact: string;
    readonly emergencyContact: string;
}
export declare class UpdateUserRequestDto {
    data: {
        UpdateUserDto: any;
    };
}
export declare class IdQuery {
    readonly id: string;
}
export declare class DIdQuery {
    readonly did: string;
}
export declare class IdQueryRequestDto {
    id: string;
    did: string;
}
export declare class ModuleAccessRequestDto {
    readonly moduleAccess: [];
}
export declare class RoleRequestDto {
    readonly role: number;
}
