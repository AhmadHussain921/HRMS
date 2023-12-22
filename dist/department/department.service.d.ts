import { Model } from 'mongoose';
import { EmployeeService } from 'src/employee/employee.service';
export declare class DepartmentService {
    private Department;
    private employeeService;
    constructor(Department: Model<any>, employeeService: EmployeeService);
    giveMyDept(id: string): Promise<any>;
    giveMyDeptByEmpId(eid: any): Promise<any>;
    remEmployeeFromDept(did: string, eid: string): Promise<any>;
}
