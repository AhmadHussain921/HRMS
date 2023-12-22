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
exports.CorrectionReqController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_auth_gaurd_1 = require("../auth/jwt-auth.gaurd");
const correctionReq_service_1 = require("./correctionReq.service");
const employee_service_1 = require("../employee/employee.service");
const correctionReq_dtos_1 = require("./correctionReq.dtos");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
const utils_1 = require("../utils/utils");
let CorrectionReqController = class CorrectionReqController {
    constructor(CorrectionReq, correctionReqService, employeeService) {
        this.CorrectionReq = CorrectionReq;
        this.correctionReqService = correctionReqService;
        this.employeeService = employeeService;
    }
    async allCorrections(req, res) {
        try {
            const all = await this.CorrectionReq.find({});
            res.status(200).json(all);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async myCorrectionReq(req, res) {
        try {
            const myExmployee = await this.employeeService.findUserByReq(req);
            const myArr = [];
            if (myExmployee.CRID.length > 0) {
                for (const crid of myExmployee.CRID) {
                    const mine = await this.correctionReqService.findMyCorrectionReq(crid);
                    myArr.push(mine);
                }
            }
            res.status(200).json(myArr);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async addCorrection(req, res, body, query) {
        try {
            const { eid } = query;
            const { data } = body;
            if (!eid || !data) {
                res.status(401);
                throw new Error('Insufficient data');
            }
            const myEmp = await this.employeeService.giveMyEmployee(eid);
            if (!myEmp) {
                res.status(404);
                throw new Error('Employee not found');
            }
            const obayedRules = await this.employeeService.roleRulesTypical(req, utils_1.modules.indexOf('correctionReq'));
            if (!obayedRules.status) {
                res.status(401);
                throw new Error(obayedRules.error);
            }
            const myCorrectionReq = await this.CorrectionReq.create(data);
            await myCorrectionReq.save();
            await myEmp.CRID.push(myCorrectionReq._id);
            await myEmp.save();
            res.status(201).json({ myEmp, myCorrectionReq });
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async updateCorrection(req, res, body, query) {
        try {
            const { crid } = query;
            const { data } = body;
            if (!crid || !data) {
                res.status(401);
                throw new Error('Insufficient data');
            }
            const obayedRules = await this.employeeService.roleRulesTypical(req, utils_1.modules.indexOf('correctionReq'));
            if (!obayedRules.status) {
                res.status(401);
                throw new Error(obayedRules.error);
            }
            const myCorrectionReq = await this.CorrectionReq.findByIdAndUpdate(crid, data, {
                new: true,
            });
            await myCorrectionReq.save();
            res.status(201).json(myCorrectionReq);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async deleteCorrection(req, res, query) {
        try {
            const { eid, crid } = query;
            if (!eid || !crid) {
                res.status(401);
                throw new Error('Insufficient data');
            }
            const myEmp = await this.employeeService.giveMyEmployee(eid);
            if (!myEmp) {
                res.status(404);
                throw new Error('Employee not found');
            }
            const obayedRules = await this.employeeService.roleRulesTypical(req, utils_1.modules.indexOf('correctionReq'));
            if (!obayedRules.status) {
                res.status(401);
                throw new Error(obayedRules.error);
            }
            const myCorrectionReq = await this.CorrectionReq.findByIdAndDelete(crid);
            if (!myCorrectionReq) {
                res.status(401);
                throw new Error('Operation unsuccessful');
            }
            const remEmpFromDept = await this.employeeService.remCorrectionreqFromEmployee(eid, crid);
            res.status(201).json({ remEmpFromDept, myCorrectionReq });
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
};
exports.CorrectionReqController = CorrectionReqController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all corrections',
        description: 'Get a list of all correction requests.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully retrieved all corrections.',
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CorrectionReqController.prototype, "allCorrections", null);
__decorate([
    (0, common_1.Put)('/me'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get my correction requests',
        description: 'Get correction requests associated with the authenticated employee.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully retrieved correction requests.',
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CorrectionReqController.prototype, "myCorrectionReq", null);
__decorate([
    (0, common_1.Put)('/add'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Add correction request',
        description: 'Add a correction request for the specified employee.',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        subject: { type: 'string' },
                        description: { type: 'string' },
                        status: { type: 'string' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiQuery)({
        name: 'eid',
        type: 'string',
        description: 'Employee ID to associate the correction request with.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Successfully added correction request.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized or Insufficient data.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee not found.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, correctionReq_dtos_1.CorrectionReqRequestDto,
        correctionReq_dtos_1.EIdQueryRequestDto]),
    __metadata("design:returntype", Promise)
], CorrectionReqController.prototype, "addCorrection", null);
__decorate([
    (0, common_1.Put)('/update'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Update correction request',
        description: 'Update the details of a correction request.',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        subject: { type: 'string' },
                        description: { type: 'string' },
                        status: { type: 'number', enum: [0, 1, 2] },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiQuery)({
        name: 'crid',
        description: 'Correction Request ID',
        type: 'string',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Successfully updated correction request.',
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
    __metadata("design:paramtypes", [Object, Object, correctionReq_dtos_1.CorrectionReqRequestDto,
        correctionReq_dtos_1.CRIDQueryRequestDto]),
    __metadata("design:returntype", Promise)
], CorrectionReqController.prototype, "updateCorrection", null);
__decorate([
    (0, common_1.Delete)('/delete'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete correction request',
        description: 'Delete a correction request associated with an employee.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'eid',
        description: 'Employee ID',
        type: 'string',
        required: true,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'crid',
        description: 'Correction Request ID',
        type: 'string',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Successfully deleted correction request.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized or Insufficient data.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Employee not found or Operation unsuccessful.',
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, correctionReq_dtos_1.ECRIDQueryRequestDto]),
    __metadata("design:returntype", Promise)
], CorrectionReqController.prototype, "deleteCorrection", null);
exports.CorrectionReqController = CorrectionReqController = __decorate([
    (0, common_1.Controller)('employee/correction/req'),
    (0, swagger_1.ApiTags)('Correction Req'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    __param(0, (0, mongoose_1.InjectModel)('CorrectionReq')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        correctionReq_service_1.CorrectionReqService,
        employee_service_1.EmployeeService])
], CorrectionReqController);
//# sourceMappingURL=correctionReq.controller.js.map