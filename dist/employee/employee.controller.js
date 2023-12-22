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
exports.EmployeeController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const department_service_1 = require("../department/department.service");
const employee_dtos_1 = require("./employee.dtos");
const employee_service_1 = require("./employee.service");
const jwt_auth_gaurd_1 = require("../auth/jwt-auth.gaurd");
const mongoose_2 = require("mongoose");
const experience_service_1 = require("../experience/experience.service");
const correctionReq_service_1 = require("../correctionReq/correctionReq.service");
const designation_service_1 = require("../designation/designation.service");
const utils_1 = require("../utils/utils");
const swagger_1 = require("@nestjs/swagger");
let EmployeeController = class EmployeeController {
    constructor(Employee, employeeService, departmentService, experienceService, correctionReqService, designationService) {
        this.Employee = Employee;
        this.employeeService = employeeService;
        this.departmentService = departmentService;
        this.experienceService = experienceService;
        this.correctionReqService = correctionReqService;
        this.designationService = designationService;
    }
    async all(req, res) {
        try {
            const myEmployee = await this.Employee.find({});
            return res.status(200).json({ myEmployee });
        }
        catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }
    async registerMyAdmin(req, res, body) {
        const { name, fatherName, cnic, profileImg, contact, emergencyContact, email, password, } = body;
        try {
            if (!name ||
                !fatherName ||
                !cnic ||
                !contact ||
                !emergencyContact ||
                !email ||
                !password) {
                res.status(404);
                throw new Error('Insufficient Details');
            }
            const isSAdminExists = await this.Employee.findOne({
                role: utils_1.Roles.indexOf('superAdmin'),
            });
            if (isSAdminExists) {
                res.status(404);
                throw new Error('Cannot register!');
            }
            const isEmpExists = await this.Employee.findOne({ email });
            if (isEmpExists) {
                res.status(404);
                throw new Error('Email already exists');
            }
            const makeSAdmin = await this.Employee.create({
                name,
                fatherName,
                cnic,
                profileImg,
                contact,
                emergencyContact,
                email,
                password,
                role: utils_1.Roles.indexOf('superAdmin'),
            });
            res.status(201).json(makeSAdmin);
        }
        catch (e) {
            console.log(e);
            res.status(401).json('Invalid Error');
        }
    }
    async register(req, res, body, query) {
        const { name, fatherName, cnic, profileImg, contact, emergencyContact, email, password, role = 0, } = body;
        const { did } = query;
        let { moduleAccess } = body;
        if (moduleAccess?.length > 1) {
            moduleAccess =
                this.employeeService.removeDuplicatesFromModuleAccessArray(moduleAccess);
        }
        try {
            if (!name ||
                !fatherName ||
                !cnic ||
                !contact ||
                !emergencyContact ||
                !email ||
                !password ||
                !did) {
                res.status(404);
                throw new Error('Insufficient data');
            }
            const myDept = await this.departmentService.giveMyDept(did);
            if (!myDept) {
                res.status(404);
                throw new Error('associated Department not found');
            }
            const obayedRules = await this.employeeService.roleRulesToRegisterUser(req, role, moduleAccess, utils_1.modules.indexOf('employee'));
            if (!obayedRules.status) {
                res.status(401);
                throw new Error(obayedRules.error);
            }
            const newEmployee = await this.Employee.create({
                name,
                fatherName,
                cnic,
                profileImg,
                contact,
                emergencyContact,
                email,
                password,
                role,
                moduleAccess: role === utils_1.Roles.indexOf('subAdmin') ? moduleAccess : [],
            });
            await newEmployee.save();
            await myDept.EID.push(newEmployee._id);
            await myDept.save();
            res.status(201).json({ newEmployee });
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async login(req, res, body) {
        const { email, password } = body;
        try {
            if (!email || !password) {
                res.status(401);
                throw new Error('Insufficient credentials');
            }
            const user = await this.Employee.findOne({ email });
            if (!user || !(await user.comparePassword(password))) {
                res.status(401);
                throw new common_1.UnauthorizedException();
            }
            const myToken = await this.employeeService.generateJWT(user._id);
            return res.status(200).json({ user, myToken });
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async updateEmp(req, res, body, query) {
        try {
            const { id } = query;
            const { data } = body;
            if (!id) {
                res.status(401);
                throw new Error('Insiffient data');
            }
            const obayedRules = await this.employeeService.roleRulesToUpdateUser(req, id, utils_1.modules.indexOf('employee'));
            if (!obayedRules.status) {
                res.status(401);
                throw new Error(obayedRules.error);
            }
            const updatedUser = await this.Employee.findByIdAndUpdate(id, data, {
                new: true,
            });
            res.status(201).json(updatedUser);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async deleteEmp(req, res, query) {
        try {
            const { id, did } = query;
            if (!id || !did) {
                res.status(401);
                throw new Error('Insufficent data');
            }
            const myDept = this.departmentService.giveMyDept(did);
            if (!myDept) {
                res.status(401);
                throw new Error('Department not exist');
            }
            const obayedRiles = await this.employeeService.roleRulesToUpdateUser(req, id, utils_1.modules.indexOf('employee'));
            if (!obayedRiles.status) {
                res.status(401);
                throw new Error(obayedRiles.error);
            }
            const deletedUser = await this.Employee.findByIdAndDelete(id);
            const remEmpFromDept = await this.departmentService.remEmployeeFromDept(did, id);
            const exId = deletedUser.EXID;
            const crIds = deletedUser.CRID;
            const desgId = deletedUser.DESGID;
            if (exId) {
                const myExperience = await this.experienceService.giveMyExperience(exId);
                if (myExperience) {
                    if (myExperience?.PJID.length > 0) {
                        for (const pjid of myExperience.PJID) {
                            await this.experienceService.delMyPrevJob(pjid);
                        }
                    }
                    if (myExperience?.TRID.length > 0) {
                        for (const tid of myExperience.TRID) {
                            await this.experienceService.delMyTraining(tid);
                        }
                    }
                    if (myExperience?.SKID.length > 0) {
                        for (const skid of myExperience.SKID) {
                            await this.experienceService.delMySkill(skid);
                        }
                    }
                    await this.experienceService.delMyExperience(exId);
                }
            }
            if (crIds.length > 0) {
                for (const crId of crIds) {
                    await this.correctionReqService.delMyCorrectionReq(crId);
                }
            }
            if (desgId) {
                await this.designationService.delMyDesignation(desgId);
            }
            res.status(201).json({ deletedUser, remEmpFromDept });
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async changeModuleAccess(req, res, body, query) {
        const { id } = query;
        let { moduleAccess } = body;
        if (moduleAccess?.length > 1) {
            moduleAccess =
                this.employeeService.removeDuplicatesFromModuleAccessArray(moduleAccess);
        }
        try {
            if (!id || moduleAccess.length <= 0) {
                res.status(404);
                throw new Error('Insufficient Data');
            }
            const obayedRule = await this.employeeService.roleRuleToChangeRoleOrModuleAccess(req, id, 'module', null);
            if (!obayedRule.status) {
                res.status(401);
                throw new Error(obayedRule.error);
            }
            const newAccess = await this.Employee.findByIdAndUpdate(id, { moduleAccess }, {
                new: true,
            });
            res.status(201).json(newAccess);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async changeRoleAccess(req, res, body, query) {
        const { id } = query;
        const { role } = body;
        try {
            if (!id) {
                res.status(404);
                throw new Error('Insufficient Data');
            }
            const obayedRule = await this.employeeService.roleRuleToChangeRoleOrModuleAccess(req, id, 'role', role);
            if (!obayedRule.status) {
                res.status(401);
                throw new Error(obayedRule.error);
            }
            const getCurrentUser = await this.Employee.findById(id);
            let decideToVanish = false;
            const myRole = getCurrentUser.role;
            if (myRole !== role) {
                if (myRole === utils_1.Roles.indexOf('subAdmin')) {
                    decideToVanish = true;
                }
            }
            const newAccess = await this.Employee.findByIdAndUpdate(id, {
                role,
                moduleAccess: decideToVanish ? [] : getCurrentUser.moduleAccess,
            }, {
                new: true,
            });
            res.status(201).json(newAccess);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async changeInactiveStatus(req, res, body, query) {
        const { id } = query;
        try {
            if (!id) {
                res.status(404);
                throw new Error('Insufficient Data');
            }
            const obayedRule = await this.employeeService.roleRulesTypical(req, utils_1.modules.indexOf('employee'));
            if (!obayedRule.status) {
                res.status(401);
                throw new Error(obayedRule.error);
            }
            const changeMyStatus = await this.Employee.findByIdAndUpdate(id, {
                status: 1,
            }, {
                new: true,
            });
            res.status(201).json(changeMyStatus);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async changeActiveStatus(req, res, body, query) {
        const { id } = query;
        try {
            if (!id) {
                res.status(404);
                throw new Error('Insufficient Data');
            }
            const obayedRule = await this.employeeService.roleRulesTypical(req, utils_1.modules.indexOf('employee'));
            if (!obayedRule.status) {
                res.status(401);
                throw new Error(obayedRule.error);
            }
            const changeMyStatus = await this.Employee.findByIdAndUpdate(id, {
                status: 0,
            }, {
                new: true,
            });
            res.status(201).json(changeMyStatus);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
};
exports.EmployeeController = EmployeeController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all employees',
        description: 'Retrieve all employees from the system.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully retrieved all employees.',
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "all", null);
__decorate([
    (0, common_1.Post)('my-super-admin'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "registerMyAdmin", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Register a new employee',
        description: 'Create a new employee with the provided details.',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                fatherName: { type: 'string' },
                cnic: { type: 'string' },
                profileImg: { type: 'string' },
                contact: { type: 'string' },
                emergencyContact: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
                role: { type: 'number' },
                moduleAccess: { type: 'array', items: { type: 'number' } },
            },
        },
        description: 'Details of the new employee to be registered.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'did',
        type: 'string',
        description: 'Department ID to associate the employee with.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Successfully registered new employee.',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Insufficient data or Associated Department not found.',
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, employee_dtos_1.CreateUserDto,
        employee_dtos_1.IdQueryRequestDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({
        summary: 'Employee login',
        description: 'Authenticate an employee with provided email and password.',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string', description: 'Employee email' },
                password: { type: 'string', description: 'Employee password' },
            },
        },
        description: 'Credentials for employee authentication.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully logged in.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized or Insufficient credentials.',
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, employee_dtos_1.AuthUserDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "login", null);
__decorate([
    (0, common_1.Put)('update'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Update employee',
        description: 'Update information for the authenticated employee.',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        fatherName: { type: 'string' },
                        cnic: { type: 'string' },
                        profileImg: { type: 'string' },
                        contact: { type: 'string' },
                        emergencyContact: { type: 'string' },
                    },
                },
            },
        },
        description: 'Data for updating the employee information.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'id',
        description: 'Employee ID',
        type: 'string',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Successfully updated employee information.',
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
    __metadata("design:paramtypes", [Object, Object, employee_dtos_1.UpdateUserRequestDto,
        employee_dtos_1.IdQueryRequestDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "updateEmp", null);
__decorate([
    (0, common_1.Delete)('delete'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete employee',
        description: 'Delete information for the authenticated employee.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'id',
        description: 'Employee ID',
        type: 'string',
        required: true,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'did',
        description: 'Department ID',
        type: 'string',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Successfully deleted employee information.',
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
    __metadata("design:paramtypes", [Object, Object, employee_dtos_1.IdQueryRequestDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "deleteEmp", null);
__decorate([
    (0, common_1.Put)('/module/access/change'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Change module access',
        description: 'Update module access for the authenticated employee.',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                moduleAccess: { type: 'array', items: { type: 'number' } },
            },
        },
        description: 'Data for changing module access for the employee. (please add all the modules access while increasing access)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'id',
        description: 'Employee ID',
        type: 'string',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Successfully changed module access.',
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
    __metadata("design:paramtypes", [Object, Object, employee_dtos_1.ModuleAccessRequestDto,
        employee_dtos_1.IdQueryRequestDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "changeModuleAccess", null);
__decorate([
    (0, common_1.Put)('/role/access/change'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Change employee role and access',
        description: 'Change the role and access for the authenticated employee.',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                role: {
                    type: 'number',
                    description: 'New role for the employee.',
                },
            },
            required: ['role'],
        },
        description: 'Data for changing the employee role and access.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'id',
        description: 'Employee ID',
        type: 'string',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Successfully changed employee role and access.',
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
    __metadata("design:paramtypes", [Object, Object, employee_dtos_1.RoleRequestDto,
        employee_dtos_1.IdQueryRequestDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "changeRoleAccess", null);
__decorate([
    (0, common_1.Put)('/status/inactive'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Change employee to inactive status',
        description: 'Change the inactive status for the authenticated employee.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'id',
        description: 'Employee ID',
        type: 'string',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Successfully changed employee inactive status.',
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
    __metadata("design:paramtypes", [Object, Object, employee_dtos_1.RoleRequestDto,
        employee_dtos_1.IdQueryRequestDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "changeInactiveStatus", null);
__decorate([
    (0, common_1.Put)('/status/active'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, employee_dtos_1.RoleRequestDto,
        employee_dtos_1.IdQueryRequestDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "changeActiveStatus", null);
exports.EmployeeController = EmployeeController = __decorate([
    (0, common_1.Controller)('employee'),
    (0, swagger_1.ApiTags)('Employee'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    __param(0, (0, mongoose_1.InjectModel)('Employee')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        employee_service_1.EmployeeService,
        department_service_1.DepartmentService,
        experience_service_1.ExperienceService,
        correctionReq_service_1.CorrectionReqService,
        designation_service_1.DesignationService])
], EmployeeController);
//# sourceMappingURL=employee.controller.js.map