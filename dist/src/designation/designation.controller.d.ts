import { Response, Request } from 'express';
import { DesignationService } from './designation.service';
import { EmployeeService } from 'src/employee/employee.service';
import { DesgReqDto, EIdQueryReqDto, DESGIdQueryReqDto, EDESGIdQueryReqDto } from './designation.dtos';
import { Model } from 'mongoose';
export declare class DesignationController {
    private Designation;
    private readonly employeeService;
    private readonly designationService;
    constructor(Designation: Model<any>, employeeService: EmployeeService, designationService: DesignationService);
    allDesignations(req: Request, res: Response): Promise<void>;
    myDesignation(req: any, res: Response): Promise<void>;
    addDesignation(req: any, res: Response, body: DesgReqDto, query: EIdQueryReqDto): Promise<void>;
    updateDesignation(req: any, res: Response, body: DesgReqDto, query: DESGIdQueryReqDto): Promise<void>;
    deleteDesignation(req: any, res: Response, query: EDESGIdQueryReqDto): Promise<void>;
}
