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
exports.ExperienceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ExperienceService = class ExperienceService {
    constructor(Experience, Skills, PrevJobs, Trainings) {
        this.Experience = Experience;
        this.Skills = Skills;
        this.PrevJobs = PrevJobs;
        this.Trainings = Trainings;
    }
    async giveMyExperience(exid) {
        try {
            const myExperience = await this.Experience.findById(exid);
            return myExperience;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    async giveMySkill(skid) {
        try {
            const mySkill = await this.Skills.findById(skid);
            return mySkill;
        }
        catch (e) {
            return null;
        }
    }
    async giveMyTraining(tid) {
        try {
            const myTraining = await this.Trainings.findById(tid);
            return myTraining;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    async giveMyPrevJob(pjid) {
        try {
            const myPrevJobs = await this.PrevJobs.findById(pjid);
            return myPrevJobs;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    async delMyPrevJob(pjid) {
        try {
            const myPrevJob = await this.PrevJobs.findByIdAndDelete(pjid);
            return myPrevJob;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    async delMySkill(skid) {
        try {
            const mySkill = await this.Skills.findByIdAndDelete(skid);
            return mySkill;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    async delMyTraining(tid) {
        try {
            const myTraining = await this.Trainings.findByIdAndDelete(tid);
            return myTraining;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    async delMyExperience(exid) {
        try {
            const myExperience = await this.Experience.findByIdAndDelete(exid);
            return myExperience;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
};
exports.ExperienceService = ExperienceService;
exports.ExperienceService = ExperienceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Experience')),
    __param(1, (0, mongoose_1.InjectModel)('Skills')),
    __param(2, (0, mongoose_1.InjectModel)('PrevJobs')),
    __param(3, (0, mongoose_1.InjectModel)('Trainings')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ExperienceService);
//# sourceMappingURL=experience.service.js.map