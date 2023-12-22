"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const employee_module_1 = require("../employee/employee.module");
const experience_controller_1 = require("./experience.controller");
const experience_service_1 = require("./experience.service");
const experience_schema_1 = require("../models/experience.schema");
const prevJobs_schema_1 = require("../models/prevJobs.schema");
const skills_schema_1 = require("../models/skills.schema");
const training_schema_1 = require("../models/training.schema");
let ExperienceModule = class ExperienceModule {
};
exports.ExperienceModule = ExperienceModule;
exports.ExperienceModule = ExperienceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Experience', schema: experience_schema_1.default }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'PrevJobs', schema: prevJobs_schema_1.default }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Skills', schema: skills_schema_1.default }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Trainings', schema: training_schema_1.default }]),
            (0, common_1.forwardRef)(() => employee_module_1.EmployeeModule),
        ],
        controllers: [experience_controller_1.ExperienceController],
        providers: [experience_service_1.ExperienceService],
        exports: [experience_service_1.ExperienceService],
    })
], ExperienceModule);
//# sourceMappingURL=experience.module.js.map