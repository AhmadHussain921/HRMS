import { Response, Request } from 'express';
import { DepartmentService } from 'src/department/department.service';
import { CreateUserDto, AuthUserDto, UpdateUserRequestDto, IdQueryRequestDto, ModuleAccessRequestDto, RoleRequestDto } from './employee.dtos';
import { EmployeeService } from './employee.service';
import { Model } from 'mongoose';
import { ExperienceService } from 'src/experience/experience.service';
import { CorrectionReqService } from 'src/correctionReq/correctionReq.service';
import { DesignationService } from 'src/designation/designation.service';
export declare class EmployeeController {
    private Employee;
    private readonly employeeService;
    private readonly departmentService;
    private readonly experienceService;
    private readonly correctionReqService;
    private readonly designationService;
    constructor(Employee: Model<any>, employeeService: EmployeeService, departmentService: DepartmentService, experienceService: ExperienceService, correctionReqService: CorrectionReqService, designationService: DesignationService);
    all(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    registerMyAdmin(req: any, res: Response, body: any): Promise<void>;
    register(req: any, res: Response, body: CreateUserDto, query: IdQueryRequestDto): Promise<void>;
    login(req: Request, res: Response, body: AuthUserDto): Promise<Response<any, Record<string, any>>>;
    updateEmp(req: any, res: Response, body: UpdateUserRequestDto, query: IdQueryRequestDto): Promise<void>;
    deleteEmp(req: any, res: Response, query: IdQueryRequestDto): Promise<void>;
    changeModuleAccess(req: any, res: Response, body: ModuleAccessRequestDto, query: IdQueryRequestDto): Promise<void>;
    changeRoleAccess(req: any, res: Response, body: RoleRequestDto, query: IdQueryRequestDto): Promise<void>;
    changeInactiveStatus(req: any, res: Response, body: RoleRequestDto, query: IdQueryRequestDto): Promise<void>;
    changeActiveStatus(req: any, res: Response, body: RoleRequestDto, query: IdQueryRequestDto): Promise<void>;
}
