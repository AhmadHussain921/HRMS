import { Response, Request } from 'express';
import { DepartmentService } from './department.service';
import { CreateDeptDto } from './department.dtos';
import { Model } from 'mongoose';
import { EmployeeService } from 'src/employee/employee.service';
import { UpdateDeptRequestDto, IdQueryRequestDto } from './department.dtos';
export declare class DepartmentController {
    private Department;
    private readonly departmentService;
    private readonly employeeService;
    constructor(Department: Model<any>, departmentService: DepartmentService, employeeService: EmployeeService);
    allDepartments(req: Request, res: Response): Promise<void>;
    myDepartments(req: Request, res: Response): Promise<void>;
    register(req: any, res: Response, body: CreateDeptDto): Promise<Response<any, Record<string, any>>>;
    updateDept(req: any, res: Response, body: UpdateDeptRequestDto, query: IdQueryRequestDto): Promise<void>;
    deleteDept(req: any, res: Response, query: IdQueryRequestDto): Promise<void>;
}
