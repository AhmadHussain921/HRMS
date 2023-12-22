"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TANDAModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const timeAndAttendance_schema_1 = require("../models/timeAndAttendance.schema");
const correctionReq_schema_1 = require("../models/correctionReq.schema");
const employee_module_1 = require("../employee/employee.module");
const tAndA_service_1 = require("./tAndA.service");
const tAndA_controller_1 = require("./tAndA.controller");
let TANDAModule = class TANDAModule {
};
exports.TANDAModule = TANDAModule;
exports.TANDAModule = TANDAModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'TimeAndAttendance', schema: timeAndAttendance_schema_1.default },
            ]),
            mongoose_1.MongooseModule.forFeature([
                { name: 'CorrectionReq', schema: correctionReq_schema_1.default },
            ]),
            (0, common_1.forwardRef)(() => employee_module_1.EmployeeModule),
        ],
        controllers: [tAndA_controller_1.TANDAController],
        providers: [tAndA_service_1.TANDAService],
        exports: [tAndA_service_1.TANDAService],
    })
], TANDAModule);
//# sourceMappingURL=tAndA.module.js.map