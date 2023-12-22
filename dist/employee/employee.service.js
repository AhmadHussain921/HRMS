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
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const mongoose_1 = require("@nestjs/mongoose");
const utils_1 = require("../utils/utils");
const mongoose_2 = require("mongoose");
let EmployeeService = class EmployeeService {
    constructor(Employee) {
        this.Employee = Employee;
    }
    async generateJWT(id) {
        try {
            const token = await jwt.sign({ id }, process.env.SECRET_KEY);
            return token;
        }
        catch (e) {
            console.log(e);
            return '';
        }
    }
    removeDuplicatesFromModuleAccessArray(arr) {
        return [...new Set(arr)];
    }
    async findUserByReq(req) {
        try {
            if (!req.user.userId) {
                return null;
            }
            const findUser = await this.Employee.findById(req.user.userId);
            if (!findUser) {
                return null;
            }
            else {
                return findUser;
            }
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    async roleRulesToRegisterUser(req, role, moduleAccess, moduleNumber) {
        try {
            const fetchedUser = await this.findUserByReq(req);
            if (!fetchedUser) {
                return {
                    status: false,
                    error: 'Invalid Error',
                };
            }
            if (fetchedUser.role <= role &&
                fetchedUser.role !== utils_1.Roles.indexOf('subAdmin')) {
                return {
                    status: false,
                    error: 'User has no permission to add this user',
                };
            }
            else if (fetchedUser.role === utils_1.Roles.indexOf('admin') &&
                role === utils_1.Roles.indexOf('subAdmin') &&
                moduleAccess?.length <= 0) {
                return {
                    status: false,
                    error: 'Admin has not provided any module permission to sub admin',
                };
            }
            else if (role === utils_1.Roles.indexOf('employee') &&
                fetchedUser.role === utils_1.Roles.indexOf('subAdmin')) {
                const checkPermissions = fetchedUser.moduleAccess;
                if (checkPermissions.includes(moduleNumber)) {
                    return { status: true };
                }
                else {
                    return {
                        status: false,
                        error: 'sub admin has no permission to add employee',
                    };
                }
            }
            else {
                return { status: true };
            }
        }
        catch (e) {
            console.log(e);
            return {
                status: false,
                message: 'Invalid Error',
            };
        }
    }
    async roleRulesToUpdateUser(req, id, moduleNumber) {
        try {
            const fetchedUser = await this.findUserByReq(req);
            if (!fetchedUser) {
                return {
                    status: false,
                    error: 'Invalid Error',
                };
            }
            const myUser = await this.Employee.findById(id);
            if (!myUser) {
                return {
                    status: false,
                    error: 'User not found',
                };
            }
            const role = myUser.role;
            if (fetchedUser.role <= role &&
                fetchedUser.role !== utils_1.Roles.indexOf('subAdmin')) {
                return {
                    status: false,
                    error: 'User has no permission to manipulate this user',
                };
            }
            else if (role === utils_1.Roles.indexOf('employee') &&
                fetchedUser.role === utils_1.Roles.indexOf('subAdmin')) {
                const checkPermissions = fetchedUser.moduleAccess;
                if (checkPermissions.includes(moduleNumber)) {
                    return { status: true };
                }
                else {
                    return {
                        status: false,
                        error: 'sub admin has no permission to manipulate employee',
                    };
                }
            }
            else {
                return { status: true };
            }
        }
        catch (e) {
            console.log(e);
            return { status: false, error: 'Invalid Error' };
        }
    }
    async roleRuleToChangeRoleOrModuleAccess(req, id, moduleControl, reqRole) {
        try {
            const fetchedUser = await this.findUserByReq(req);
            if (!fetchedUser) {
                return {
                    status: false,
                    error: 'Invalid Error',
                };
            }
            const myUser = await this.Employee.findById(id);
            if (!myUser) {
                return {
                    status: false,
                    error: 'User not found',
                };
            }
            const role = myUser.role;
            if (fetchedUser.role <= role || moduleControl === 'module'
                ? role !== utils_1.Roles.indexOf('subAdmin')
                : role === utils_1.Roles.indexOf('subAdmin') && reqRole >= fetchedUser.role) {
                return {
                    status: false,
                    error: 'User has no permission to manipulate this user',
                };
            }
            else {
                return {
                    status: true,
                };
            }
        }
        catch (e) {
            console.log(e);
            throw new Error('invalid Error');
        }
    }
    async roleRulesSubAdminTypical(req, moduleNumber) {
        try {
            const fetchedUser = await this.findUserByReq(req);
            if (!fetchedUser) {
                return {
                    status: false,
                    error: 'Invalid Error',
                };
            }
            else if (fetchedUser.role === utils_1.Roles.indexOf('subAdmin')) {
                const checkPermissions = fetchedUser.moduleAccess;
                if (checkPermissions.includes(moduleNumber)) {
                    return { status: true };
                }
                else {
                    return {
                        status: false,
                        error: 'sub admin has no permission to perform  operation',
                    };
                }
            }
            else {
                return { status: true };
            }
        }
        catch (e) {
            console.log(e);
            return {
                status: false,
                error: 'Invalid Error',
            };
        }
    }
    async roleRulesTypical(req, moduleNumber) {
        try {
            const fetchedUser = await this.findUserByReq(req);
            if (!fetchedUser) {
                return {
                    status: false,
                    error: 'Invalid Error',
                };
            }
            if (fetchedUser.role === utils_1.Roles.indexOf('employee')) {
                return {
                    status: false,
                    error: 'user has no permission to perform operation',
                };
            }
            else if (fetchedUser.role === utils_1.Roles.indexOf('subAdmin')) {
                const checkPermissions = fetchedUser.moduleAccess;
                if (checkPermissions.includes(moduleNumber)) {
                    return { status: true };
                }
                else {
                    return {
                        status: false,
                        error: 'sub admin has no permission to perform operation',
                    };
                }
            }
            else {
                return { status: true };
            }
        }
        catch (e) {
            console.log(e);
            return {
                status: false,
                error: 'Invalid Error',
            };
        }
    }
    async giveMyEmployee(id) {
        try {
            const thisIsMine = await this.Employee.findById(id);
            return thisIsMine;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    async remCorrectionreqFromEmployee(eid, crid) {
        try {
            const remCorrectionReq = await this.Employee.findByIdAndUpdate(eid, { $pull: { CRID: crid } }, { new: true });
            return remCorrectionReq;
        }
        catch (e) {
            console.log(e);
            throw new Error('Invalid error');
        }
    }
    async giveMyAttendance(eid) {
        try {
            const myAttendance = await this.Employee.findById(eid).populate('TimeAndAttendance');
            if (!myAttendance) {
                return null;
            }
            else {
                return myAttendance;
            }
        }
        catch (e) {
            console.log(e);
            throw new Error('Invalid error');
        }
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Employee')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map