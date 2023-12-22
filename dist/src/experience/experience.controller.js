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
exports.ExperienceController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_auth_gaurd_1 = require("../auth/jwt-auth.gaurd");
const utils_1 = require("src/utils/utils");
const employee_service_1 = require("../employee/employee.service");
const experience_service_1 = require("./experience.service");
const experience_dtos_1 = require("./experience.dtos");
const swagger_1 = require("@nestjs/swagger");
let ExperienceController = class ExperienceController {
    constructor(Experience, Skills, PrevJobs, Trainings, employeeService, experienceService) {
        this.Experience = Experience;
        this.Skills = Skills;
        this.PrevJobs = PrevJobs;
        this.Trainings = Trainings;
        this.employeeService = employeeService;
        this.experienceService = experienceService;
    }
    async allExperiences(req, res) {
        try {
            const myExperiences = await this.Experience.find({});
            res.status(200).json(myExperiences);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async myExperience(req, res) {
        try {
            const myExmployee = await this.employeeService.findUserByReq(req);
            const mine = await this.experienceService.giveMyExperience(myExmployee.EXID);
            res.status(200).json(mine);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async addExperience(req, res, body, query) {
        const { id } = query;
        const { skills, prevJobs, trainings } = body;
        try {
            if (!id) {
                res.status(404);
                throw new Error('Insufficient data');
            }
            const mineEmp = await this.employeeService.giveMyEmployee(id);
            if (!mineEmp) {
                res.status(404);
                throw new Error('My employee not found');
            }
            const obayedRules = await this.employeeService.roleRulesTypical(req, utils_1.modules.indexOf('employee'));
            if (!obayedRules.status) {
                res.status(401);
                throw new Error(obayedRules.error);
            }
            if (mineEmp.EXID) {
                const wholeData = await mineEmp.populate({
                    path: 'EXID',
                    populate: {
                        path: 'PJID TRID SKID',
                    },
                });
                return res.status(201).json(wholeData);
            }
            const newExperience = new this.Experience();
            for (const skill of skills) {
                const addSkill = await this.Skills.create(skill);
                await addSkill.save();
                newExperience.SKID.push(addSkill);
            }
            for (const training of trainings) {
                const addTraining = await this.Trainings.create(training);
                await addTraining.save();
                newExperience.TRID.push(addTraining);
            }
            for (const prevJob of prevJobs) {
                const addPrevJob = await this.PrevJobs.create(prevJob);
                await addPrevJob.save();
                newExperience.PJID.push(addPrevJob);
            }
            await newExperience.save();
            mineEmp.EXID = newExperience._id;
            await mineEmp.save();
            const wholeData = await mineEmp.populate({
                path: 'EXID',
                populate: {
                    path: 'PJID TRID SKID',
                },
            });
            res.status(201).json(wholeData);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async updateExperience(req, res, body, query) {
        const { eid, exid } = query;
        const { skills, prevJobs, trainings } = body;
        try {
            if (!eid || !exid) {
                res.status(404);
                throw new Error('Insufficient data');
            }
            const mineEmp = await this.employeeService.giveMyEmployee(eid);
            if (!mineEmp) {
                res.status(404);
                throw new Error('My employee not found');
            }
            const obayedRules = await this.employeeService.roleRulesTypical(req, utils_1.modules.indexOf('employee'));
            if (!obayedRules.status) {
                res.status(401);
                throw new Error(obayedRules.error);
            }
            const myExperience = await this.Experience.findById(exid);
            for (const skill of skills) {
                const addSkill = await this.Skills.create(skill);
                await addSkill.save();
                myExperience.SKID.push(addSkill);
            }
            for (const training of trainings) {
                const addTraining = await this.Trainings.create(training);
                await addTraining.save();
                myExperience.TRID.push(addTraining);
            }
            for (const prevJob of prevJobs) {
                const addPrevJob = await this.PrevJobs.create(prevJob);
                await addPrevJob.save();
                myExperience.PJID.push(addPrevJob);
            }
            await myExperience.save();
            const wholeData = await mineEmp.populate({
                path: 'EXID',
                populate: {
                    path: 'PJID TRID SKID',
                },
            });
            res.status(201).json(wholeData);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async editSkills(req, res, body, query) {
        const { sid } = query;
        const { skill } = body;
        if (!sid || !skill) {
            res.status(400);
            throw new Error('insufficient details');
        }
        try {
            const obayedRules = await this.employeeService.roleRulesTypical(req, utils_1.modules.indexOf('employee'));
            if (!obayedRules.status) {
                res.status(401);
                throw new Error(obayedRules.error);
            }
            const editedSkills = await this.Skills.findByIdAndUpdate(sid, skill, {
                new: true,
            });
            if (!editedSkills) {
                res.status(400);
                throw new Error('Invalid Error');
            }
            res.status(201).json(editedSkills);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async editPrevJobs(req, res, query, body) {
        const { pjid } = query;
        const { prevJob } = body;
        if (!pjid || !prevJob) {
            res.status(400);
            throw new Error('insufficient details');
        }
        try {
            const obayedRules = await this.employeeService.roleRulesTypical(req, utils_1.modules.indexOf('employee'));
            if (!obayedRules.status) {
                res.status(401);
                throw new Error(obayedRules.error);
            }
            const editedPrevJobs = await this.PrevJobs.findByIdAndUpdate(pjid, prevJob, {
                new: true,
            });
            if (!editedPrevJobs) {
                res.status(400);
                throw new Error('Invalid Error');
            }
            res.status(201).json(editedPrevJobs);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async editTrainings(req, res, query, body) {
        const { tid } = query;
        const { training } = body;
        if (!tid || !training) {
            res.status(400);
            throw new Error('insufficient details');
        }
        try {
            const obayedRules = await this.employeeService.roleRulesTypical(req, utils_1.modules.indexOf('employee'));
            if (!obayedRules.status) {
                res.status(401);
                throw new Error(obayedRules.error);
            }
            const editedTraining = await this.Trainings.findByIdAndUpdate(tid, training, {
                new: true,
            });
            if (!editedTraining) {
                res.status(400);
                throw new Error('Invalid Error');
            }
            res.status(201).json(editedTraining);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async removeSkill(req, res, query) {
        const { exid, skid } = query;
        try {
            if (!exid || !skid) {
                res.status(404);
                throw new Error('Insufficient data');
            }
            const remSkill = await this.Skills.findOneAndDelete(skid);
            if (remSkill) {
                await this.Experience.findByIdAndUpdate(exid, {
                    $pull: { SKID: skid },
                }, {
                    new: true,
                });
            }
            res.status(201).json(remSkill);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async removePrevJob(req, res, query) {
        const { exid, pjid } = query;
        try {
            if (!exid || !pjid) {
                res.status(404);
                throw new Error('Insufficient data');
            }
            const removePrevJob = await this.PrevJobs.findOneAndDelete(pjid);
            if (removePrevJob) {
                await this.Experience.findByIdAndUpdate(exid, {
                    $pull: { PJID: pjid },
                }, {
                    new: true,
                });
            }
            res.status(201).json(removePrevJob);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async removeTraining(req, res, query) {
        const { exid, tid } = query;
        try {
            if (!exid || !tid) {
                res.status(404);
                throw new Error('Insufficient data');
            }
            const removeTraining = await this.Trainings.findOneAndDelete(tid);
            if (removeTraining) {
                await this.Experience.findByIdAndUpdate(exid, {
                    $pull: { TRID: tid },
                }, {
                    new: true,
                });
            }
            res.status(201).json(removeTraining);
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
    async deleteExperience(req, res, query) {
        const { eid, exid } = query;
        try {
            if (!exid) {
                res.status(404);
                throw new Error('Insufficient details');
            }
            const myEmp = await this.employeeService.giveMyEmployee(eid);
            if (myEmp && exid) {
                const myExperience = await this.experienceService.giveMyExperience(exid);
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
                    await this.experienceService.delMyExperience(exid);
                }
                myEmp.EXID = null;
                await myEmp.save();
            }
            res.status(201).json({ myEmp });
        }
        catch (e) {
            console.log(e);
            res.status(500).json('Invalid Error');
        }
    }
};
exports.ExperienceController = ExperienceController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all experiences',
        description: 'Retrieve all experiences.',
    }),
    (0, swagger_1.ApiOkResponse)({
        status: 200,
        description: 'Successfully retrieved experiences.',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: 500,
        description: 'Invalid Error',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "allExperiences", null);
__decorate([
    (0, common_1.Put)('/me'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get my experience',
        description: 'Retrieve the experience of the currently authenticated user.',
    }),
    (0, swagger_1.ApiOkResponse)({
        status: 200,
        description: 'Successfully retrieved my experience.',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "myExperience", null);
__decorate([
    (0, common_1.Put)('add'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Add experience for the authenticated user',
        description: 'Add a new experience including skills, previous jobs, and trainings for the authenticated user.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Successfully added experience.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Insufficient data or My employee not found.',
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                skills: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            skillName: { type: 'string' },
                            duration: { type: 'string' },
                        },
                    },
                    description: 'Array of skills',
                },
                prevJobs: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            jobTitle: { type: 'string' },
                            companyName: { type: 'string' },
                            companyContact: { type: 'string' },
                            salary: { type: 'number' },
                        },
                    },
                    description: 'Array of previous jobs',
                },
                trainings: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            trainingName: { type: 'string' },
                            instituteName: { type: 'string' },
                            description: { type: 'string' },
                            tariningDuration: { type: 'string' },
                            outcomeDetails: { type: 'string' },
                        },
                    },
                    description: 'Array of trainings',
                },
            },
        },
    }),
    (0, swagger_1.ApiQuery)({
        name: 'id',
        type: 'string',
        description: 'The employee ID as a query parameter',
        required: true,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, experience_dtos_1.AddExpReqDto,
        experience_dtos_1.EIdQueryRequestDto]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "addExperience", null);
__decorate([
    (0, common_1.Put)('update'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Update experience for the authenticated user',
        description: 'Update the existing experience, including skills, previous jobs, and trainings for the authenticated user.',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                skills: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            skillName: { type: 'string' },
                            duration: { type: 'string' },
                        },
                    },
                    description: 'Array of skills',
                },
                prevJobs: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            jobTitle: { type: 'string' },
                            companyName: { type: 'string' },
                            companyContact: { type: 'string' },
                            salary: { type: 'number' },
                        },
                    },
                    description: 'Array of previous jobs',
                },
                trainings: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            trainingName: { type: 'string' },
                            instituteName: { type: 'string' },
                            description: { type: 'string' },
                            tariningDuration: { type: 'string' },
                            outcomeDetails: { type: 'string' },
                        },
                    },
                    description: 'Array of trainings',
                },
            },
        },
    }),
    (0, swagger_1.ApiQuery)({
        name: 'eid',
        type: 'string',
        description: 'The employee ID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'exid',
        type: 'string',
        description: 'The experience ID to be updated',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Successfully updated experience.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Insufficient data or My employee not found.',
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, experience_dtos_1.AddExpReqDto, Object]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "updateExperience", null);
__decorate([
    (0, common_1.Put)('edit/skill'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Edit skills for the authenticated user',
        description: 'Edit existing skills for the authenticated user.',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                skill: {
                    type: 'object',
                    properties: {
                        skillName: { type: 'string' },
                        duration: { type: 'string' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sid',
        type: 'string',
        description: 'The skill ID to be edited',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Successfully edited skills.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Insufficient details or Invalid Error.',
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, experience_dtos_1.SkillReqDto,
        experience_dtos_1.SIdQueryRequestDto]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "editSkills", null);
__decorate([
    (0, common_1.Put)('edit/prevjob'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Edit previous jobs for the authenticated user',
        description: 'Edit existing previous jobs for the authenticated user.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'pjid',
        type: 'string',
        description: 'The previous job ID to be edited',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                prevJob: {
                    type: 'object',
                    properties: {
                        jobTitle: { type: 'string' },
                        companyName: { type: 'string' },
                        companyContact: { type: 'string' },
                        salary: { type: 'number' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Successfully edited previous jobs.',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Insufficient details or Invalid Error.',
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "editPrevJobs", null);
__decorate([
    (0, common_1.Put)('edit/training'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Edit training details for the authenticated user',
        description: 'Edit existing training details for the authenticated user.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'tid',
        type: 'string',
        description: 'The training ID to be edited',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                training: {
                    type: 'object',
                    properties: {
                        trainingName: { type: 'string' },
                        instituteName: { type: 'string' },
                        description: { type: 'string' },
                        trainingDuration: { type: 'string' },
                        outcomeDetails: { type: 'string' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Successfully edited training details.',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Insufficient details or Invalid Error.',
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "editTrainings", null);
__decorate([
    (0, common_1.Put)('remove/skill'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove skill for the authenticated user',
        description: 'Remove a skill for the authenticated user by providing experience ID and skill ID.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'exid',
        type: 'string',
        description: 'The experience ID for the authenticated user',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'skid',
        type: 'string',
        description: 'The skill ID to be removed',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Successfully removed the skill.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Insufficient data.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "removeSkill", null);
__decorate([
    (0, common_1.Put)('remove/prevjob'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove previous job for the authenticated user',
        description: 'Remove a previous job for the authenticated user by providing experience ID and previous job ID.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'exid',
        type: 'string',
        description: 'The experience ID for the authenticated user',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'pjid',
        type: 'string',
        description: 'The previous job ID to be removed',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Successfully removed the previous job.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Insufficient data.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "removePrevJob", null);
__decorate([
    (0, common_1.Put)('remove/training'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove training for the authenticated user',
        description: 'Remove a training for the authenticated user by providing experience ID and training ID.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'exid',
        type: 'string',
        description: 'The experience ID for the authenticated user',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'tid',
        type: 'string',
        description: 'The training ID to be removed',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Successfully removed the training.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Insufficient data.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "removeTraining", null);
__decorate([
    (0, common_1.Delete)('delete'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete experience for the authenticated user',
        description: 'Delete the experience, including skills, previous jobs, and trainings for the authenticated user.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'eid',
        type: 'string',
        description: 'The employee ID for the authenticated user',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'exid',
        type: 'string',
        description: 'The experience ID to be deleted',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Successfully deleted experience.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Insufficient details.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "deleteExperience", null);
exports.ExperienceController = ExperienceController = __decorate([
    (0, common_1.Controller)('employee/experience'),
    (0, swagger_1.ApiTags)('Experience'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    __param(0, (0, mongoose_1.InjectModel)('Experience')),
    __param(1, (0, mongoose_1.InjectModel)('Skills')),
    __param(2, (0, mongoose_1.InjectModel)('PrevJobs')),
    __param(3, (0, mongoose_1.InjectModel)('Trainings')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        employee_service_1.EmployeeService,
        experience_service_1.ExperienceService])
], ExperienceController);
//# sourceMappingURL=experience.controller.js.map