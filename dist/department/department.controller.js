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
exports.DepartmentController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const department_service_1 = require("./department.service");
const jwt_auth_gaurd_1 = require("../auth/jwt-auth.gaurd");
const department_dtos_1 = require("./department.dtos");
const mongoose_2 = require("mongoose");
const utils_1 = require("../utils/utils");
const employee_service_1 = require("../employee/employee.service");
const department_dtos_2 = require("./department.dtos");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
let DepartmentController = class DepartmentController {
    constructor(Department, departmentService, employeeService) {
        this.Department = Department;
        this.departmentService = departmentService;
        this.employeeService = employeeService;
    }
    async allDepartments(req, res) {
        try {
            const depts = await this.Department.find({});
            res.status(200).json(depts);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async myDepartments(req, res) {
        try {
            const myExmployee = await this.employeeService.findUserByReq(req);
            const mine = await this.departmentService.giveMyDeptByEmpId(myExmployee._id);
            res.status(200).json(mine);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async register(req, res, body) {
        const { name, email, contact, profileImg } = body;
        try {
            if (!name || !email || !contact) {
                res.status(404);
                throw new Error('Insufficient details');
            }
            const checkforDuplicate = await this.Department.findOne({ name });
            if (checkforDuplicate) {
                res.status(404);
                throw new Error('Department already exists');
            }
            const obayedRules = await this.employeeService.roleRulesTypical(req, utils_1.modules.indexOf('department'));
            if (!obayedRules.status) {
                res.status(401);
                throw new Error(obayedRules.error);
            }
            const newDep = await this.Department.create({
                name,
                email,
                contact,
                profileImg,
            });
            await newDep.save();
            return res.status(201).json(newDep);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async updateDept(req, res, body, query) {
        const { id } = query;
        const { data } = body;
        try {
            if (!id) {
                res.status(401);
                throw new Error('Insiffient data');
            }
            if ((0, class_validator_1.IsBoolean)(data?.EID)) {
                delete data.EID;
            }
            const obayedRules = await this.employeeService.roleRulesTypical(req, utils_1.modules.indexOf('department'));
            if (!obayedRules.status) {
                res.status(401);
                throw new Error(obayedRules.error);
            }
            const updateDept = await this.Department.findByIdAndUpdate(id, data, {
                new: true,
            });
            res.status(201).json(updateDept);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async deleteDept(req, res, query) {
        const { id } = query;
        try {
            if (!id) {
                res.status(401);
                throw new Error('Insiffient data');
            }
            const obayedRules = await this.employeeService.roleRulesTypical(req, utils_1.modules.indexOf('department'));
            if (!obayedRules.status) {
                res.status(401);
                throw new Error(obayedRules.error);
            }
            const delDept = await this.Department.findByIdAndDelete(id);
            res.status(201).json(delDept);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
};
exports.DepartmentController = DepartmentController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all departments',
        description: 'Retrieve a list of all departments.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully retrieved all departments.',
        type: 'array',
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "allDepartments", null);
__decorate([
    (0, common_1.Get)('/me'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get departments for the authenticated employee',
        description: 'Retrieve departments associated with the authenticated employee.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully retrieved departments for the authenticated employee.',
        type: 'object',
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "myDepartments", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Register a new department',
        description: 'Create a new department with the provided details.',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                contact: { type: 'string' },
                profileImg: { type: 'string' },
            },
            required: ['name', 'email', 'contact'],
        },
        description: 'Details of the new department to be registered.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Successfully registered new department.',
        type: 'object',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized or Insufficient details.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Insufficient details or Department already exists.',
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, department_dtos_1.CreateDeptDto]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "register", null);
__decorate([
    (0, common_1.Put)('update'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Update department',
        description: 'Update information for the authenticated department.',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        email: { type: 'string' },
                        contact: { type: 'string' },
                        profileImg: { type: 'string' },
                    },
                },
            },
        },
        description: 'Data for updating the department information.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'id',
        description: 'Department ID',
        type: 'string',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Successfully updated department information.',
        type: 'object',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized or Insufficient data.',
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, department_dtos_2.UpdateDeptRequestDto,
        department_dtos_2.IdQueryRequestDto]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "updateDept", null);
__decorate([
    (0, common_1.Delete)('delete'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete department',
        description: 'Delete the authenticated department.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'id',
        description: 'Department ID',
        type: 'string',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Successfully deleted department.',
        type: 'object',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized or Insufficient data.',
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, department_dtos_2.IdQueryRequestDto]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "deleteDept", null);
exports.DepartmentController = DepartmentController = __decorate([
    (0, common_1.Controller)('department'),
    (0, swagger_1.ApiTags)('Department'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    __param(0, (0, mongoose_1.InjectModel)('Department')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        department_service_1.DepartmentService,
        employee_service_1.EmployeeService])
], DepartmentController);
//# sourceMappingURL=department.controller.js.map