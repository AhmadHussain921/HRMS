import { EmployeeService } from 'src/employee/employee.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    validate(payload: any): Promise<{
        userId: any;
    }>;
}
export {};
