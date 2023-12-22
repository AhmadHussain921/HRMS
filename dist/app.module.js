"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const department_module_1 = require("./department/department.module");
const experience_module_1 = require("./experience/experience.module");
const employee_module_1 = require("./employee/employee.module");
const designation_module_1 = require("./designation/designation.module");
const auth_module_1 = require("./auth/auth.module");
const correctionReq_module_1 = require("./correctionReq/correctionReq.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot(process.env.DB, { dbName: 'HRV2',
                connectionFactory: (connection) => {
                    connection.on('connected', () => {
                        console.log('DB Connected ', connection.host);
                    });
                    connection._events.connected();
                    return connection;
                },
            }),
            employee_module_1.EmployeeModule,
            auth_module_1.AuthModule,
            department_module_1.DepartmentModule,
            experience_module_1.ExperienceModule,
            correctionReq_module_1.CorrectionReqModule,
            designation_module_1.DesignationModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map