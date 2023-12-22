"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const employee_service_1 = require("src/employee/employee.service");
let DepartmentService = class DepartmentService {
    constructor(Department, employeeService) {
        this.Department = Department;
        this.employeeService = employeeService;
    }
    async giveMyDept(id) {
        try {
            const myDept = await this.Department.findById(id);
            return myDept;
        }
        catch (e) {
            console.log(e);
            throw new Error('Invalid error');
        }
    }
    async giveMyDeptByEmpId(eid) {
        try {
            const myDept = await this.Department.findOne({
                EID: eid,
            });
            return myDept;
        }
        catch (e) {
            console.log(e);
            throw new Error('Invalid error');
        }
    }
    async remEmployeeFromDept(did, eid) {
        try {
            const remEmp = await this.Department.findByIdAndUpdate(did, { $pull: { EID: eid } }, { new: true });
            return remEmp;
        }
        catch (e) {
            console.log(e);
            throw new Error('Invalid error');
        }
    }
};
exports.DepartmentService = DepartmentService;
exports.DepartmentService = DepartmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Department')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        employee_service_1.EmployeeService])
], DepartmentService);
//# sourceMappingURL=department.service.js.map