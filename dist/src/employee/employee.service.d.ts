import { Model } from 'mongoose';
export declare class EmployeeService {
    private Employee;
    constructor(Employee: Model<any>);
    generateJWT(id: any): Promise<any>;
    removeDuplicatesFromModuleAccessArray(arr?: []): never[];
    findUserByReq(req: any): Promise<any>;
    roleRulesToRegisterUser(req: any, role: number, moduleAccess: [], moduleNumber: number): Promise<{
        status: boolean;
        error: string;
        message?: undefined;
    } | {
        status: boolean;
        error?: undefined;
        message?: undefined;
    } | {
        status: boolean;
        message: string;
        error?: undefined;
    }>;
    roleRulesToUpdateUser(req: any, id: any, moduleNumber: number): Promise<{
        status: boolean;
        error: string;
    } | {
        status: boolean;
        error?: undefined;
    }>;
    roleRuleToChangeRoleOrModuleAccess(req: any, id: any, moduleControl: string, reqRole: any): Promise<{
        status: boolean;
        error: string;
    } | {
        status: boolean;
        error?: undefined;
    }>;
    roleRulesSubAdminTypical(req: any, moduleNumber: number): Promise<{
        status: boolean;
        error: string;
    } | {
        status: boolean;
        error?: undefined;
    }>;
    roleRulesTypical(req: any, moduleNumber: number): Promise<{
        status: boolean;
        error: string;
    } | {
        status: boolean;
        error?: undefined;
    }>;
    giveMyEmployee(id: any): Promise<any>;
    remCorrectionreqFromEmployee(eid: any, crid: any): Promise<any>;
    giveMyAttendance(eid: any): Promise<any>;
}
