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
exports.TANDAController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const employee_service_1 = require("../employee/employee.service");
const tAndA_service_1 = require("./tAndA.service");
const jwt_auth_gaurd_1 = require("../auth/jwt-auth.gaurd");
const utils_1 = require("src/utils/utils");
let TANDAController = class TANDAController {
    constructor(TimeAndAttendance, LeaveReq, employeeService, tAndAService) {
        this.TimeAndAttendance = TimeAndAttendance;
        this.LeaveReq = LeaveReq;
        this.employeeService = employeeService;
        this.tAndAService = tAndAService;
    }
    async getAttendance(req, res) {
        try {
            if (!req) {
                return res.status(401).json('User not found');
            }
            const obayedRules = await this.employeeService.roleRulesSubAdminTypical(req, utils_1.modules.indexOf('attendance'));
            if (!obayedRules.status) {
                res.status(401);
                throw new Error(obayedRules.error);
            }
            const myAttendance = this.employeeService.giveMyAttendance(req._id);
            if (!myAttendance) {
                return res.status(404).json('attendance not found');
            }
            else {
                return res.status(200).json(myAttendance);
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
};
exports.TANDAController = TANDAController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TANDAController.prototype, "getAttendance", null);
exports.TANDAController = TANDAController = __decorate([
    (0, common_1.Controller)('employee/experience'),
    (0, swagger_1.ApiTags)('Experience'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    __param(0, (0, mongoose_1.InjectModel)('TimeAndAttendance')),
    __param(1, (0, mongoose_1.InjectModel)('LeaveReq')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        employee_service_1.EmployeeService,
        tAndA_service_1.TANDAService])
], TANDAController);
//# sourceMappingURL=tAndA.controller.js.map