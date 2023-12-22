import { Response } from 'express';
import { Model } from 'mongoose';
import { EmployeeService } from '../employee/employee.service';
import { TANDAService } from './tAndA.service';
export declare class TANDAController {
    private TimeAndAttendance;
    private LeaveReq;
    private readonly employeeService;
    private readonly tAndAService;
    constructor(TimeAndAttendance: Model<any>, LeaveReq: Model<any>, employeeService: EmployeeService, tAndAService: TANDAService);
    getAttendance(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
