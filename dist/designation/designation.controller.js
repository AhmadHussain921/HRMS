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
exports.DesignationController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_auth_gaurd_1 = require("../auth/jwt-auth.gaurd");
const designation_service_1 = require("./designation.service");
const employee_service_1 = require("../employee/employee.service");
const designation_dtos_1 = require("./designation.dtos");
const mongoose_2 = require("mongoose");
const utils_1 = require("../utils/utils");
const swagger_1 = require("@nestjs/swagger");
let DesignationController = class DesignationController {
    constructor(Designation, employeeService, designationService) {
        this.Designation = Designation;
        this.employeeService = employeeService;
        this.designationService = designationService;
    }
    async allDesignations(req, res) {
        try {
            const fetchingDesignations = await this.Designation.find({});
            res.status(200).json(fetchingDesignations);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async myDesignation(req, res) {
        try {
            const myExmployee = await this.employeeService.findUserByReq(req);
            const mine = await this.designationService.giveMyDesignation(myExmployee.DESGID);
            res.status(200).json(mine);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async addDesignation(req, res, body, query) {
        const { data } = body;
        const { eid } = query;
        try {
            if (!Boolean(data) || !eid) {
                res.status(404);
                throw new Error('Insufficient data');
            }
            const findingMyEmp = await this.employeeService.giveMyEmployee(eid);
            if (!findingMyEmp) {
                res.status(404);
                throw new Error('Employee not found');
            }
            const obayedRules = await this.employeeService.roleRulesTypical(req, utils_1.modules.indexOf('employee'));
            if (!obayedRules.status) {
                res.status(401);
                throw new Error(obayedRules.error);
            }
            const newDesignation = await this.Designation.create(data);
            await newDesignation.save();
            findingMyEmp.DESGID = newDesignation._id;
            await findingMyEmp.save();
            res.status(201).json({ newDesignation, findingMyEmp });
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async updateDesignation(req, res, body, query) {
        const { data } = body;
        const { desgId } = query;
        try {
            if (!Boolean(data) || !desgId) {
                res.status(404);
                throw new Error('Insufficient data');
            }
            const obayedRules = await this.employeeService.roleRulesTypical(req, utils_1.modules.indexOf('employee'));
            if (!obayedRules.status) {
                res.status(401);
                throw new Error(obayedRules.error);
            }
            const updateDesignation = await this.Designation.findByIdAndUpdate(desgId, data, {
                new: true,
            });
            res.status(201).json({ updateDesignation });
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async deleteDesignation(req, res, query) {
        const { eid, desgId } = query;
        try {
            if (!desgId || !eid) {
                res.status(404);
                throw new Error('Insufficient data');
            }
            const findingMyEmp = await this.employeeService.giveMyEmployee(eid);
            if (!findingMyEmp) {
                res.status(404);
                throw new Error('Employee not found');
            }
            const obayedRules = await this.employeeService.roleRulesTypical(req, utils_1.modules.indexOf('employee'));
            if (!obayedRules.status) {
                res.status(401);
                throw new Error(obayedRules.error);
            }
            const delDesignation = await this.Designation.findByIdAndDelete(desgId);
            findingMyEmp.DESGID = null;
            await findingMyEmp.save();
            res.status(201).json({ delDesignation });
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
};
exports.DesignationController = DesignationController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all designations',
        description: 'Retrieve a list of all designations.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully retrieved designations.',
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DesignationController.prototype, "allDesignations", null);
__decorate([
    (0, common_1.Put)('/me'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get my designation',
        description: 'Retrieve the designation of the currently authenticated user.',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully retrieved my designation.',
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DesignationController.prototype, "myDesignation", null);
__decorate([
    (0, common_1.Put)('add'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Add designation for the authenticated user',
        description: 'Add a new designation for the authenticated user.',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        deptName: { type: 'string' },
                        salary: { type: 'number' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiQuery)({ type: 'string', name: 'eid' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Successfully added designation.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Insufficient data or Employee not found.',
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, designation_dtos_1.DesgReqDto,
        designation_dtos_1.EIdQueryReqDto]),
    __metadata("design:returntype", Promise)
], DesignationController.prototype, "addDesignation", null);
__decorate([
    (0, common_1.Put)('update'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Update designation for the authenticated user',
        description: 'Update the existing designation for the authenticated user.',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        deptName: { type: 'string' },
                        salary: { type: 'number' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiQuery)({ type: 'string', name: 'desgId' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Successfully updated designation.',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Insufficient data.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, designation_dtos_1.DesgReqDto,
        designation_dtos_1.DESGIdQueryReqDto]),
    __metadata("design:returntype", Promise)
], DesignationController.prototype, "updateDesignation", null);
__decorate([
    (0, common_1.Delete)('/delete'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete designation for the authenticated user',
        description: 'Delete the existing designation for the authenticated user.',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({ type: 'string', name: 'eid' }),
    (0, swagger_1.ApiQuery)({ type: 'string', name: 'desgId' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Successfully deleted designation.',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Insufficient data.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, designation_dtos_1.EDESGIdQueryReqDto]),
    __metadata("design:returntype", Promise)
], DesignationController.prototype, "deleteDesignation", null);
exports.DesignationController = DesignationController = __decorate([
    (0, common_1.Controller)('employee/designation'),
    (0, swagger_1.ApiTags)('Designation'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    __param(0, (0, mongoose_1.InjectModel)('Designation')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        employee_service_1.EmployeeService,
        designation_service_1.DesignationService])
], DesignationController);
//# sourceMappingURL=designation.controller.js.map