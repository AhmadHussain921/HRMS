"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorrectionReqModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const correctionReq_controller_1 = require("./correctionReq.controller");
const correctionReq_service_1 = require("./correctionReq.service");
const correctionReq_schema_1 = require("../models/correctionReq.schema");
const employee_module_1 = require("../employee/employee.module");
let CorrectionReqModule = class CorrectionReqModule {
};
exports.CorrectionReqModule = CorrectionReqModule;
exports.CorrectionReqModule = CorrectionReqModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'CorrectionReq', schema: correctionReq_schema_1.default },
            ]),
            (0, common_1.forwardRef)(() => employee_module_1.EmployeeModule),
        ],
        controllers: [correctionReq_controller_1.CorrectionReqController],
        providers: [correctionReq_service_1.CorrectionReqService],
        exports: [correctionReq_service_1.CorrectionReqService],
    })
], CorrectionReqModule);
//# sourceMappingURL=correctionReq.module.js.map