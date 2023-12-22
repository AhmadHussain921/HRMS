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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ESIdQueryRequestDto = exports.TIdQueryRequestDto = exports.PJIdQueryRequestDto = exports.SIdQueryRequestDto = exports.EIdQueryRequestDto = exports.TrainingReqDto = exports.PrevJobReqDto = exports.SkillReqDto = exports.AddExpReqDto = exports.IdQuery = exports.TrainingDto = exports.PrevJobDto = exports.SkillsDto = void 0;
const class_validator_1 = require("class-validator");
class SkillsDto {
}
exports.SkillsDto = SkillsDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SkillsDto.prototype, "skillName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SkillsDto.prototype, "duration", void 0);
class PrevJobDto {
}
exports.PrevJobDto = PrevJobDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrevJobDto.prototype, "jobTitle", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrevJobDto.prototype, "companyName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrevJobDto.prototype, "companyContact", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PrevJobDto.prototype, "salary", void 0);
class TrainingDto {
}
exports.TrainingDto = TrainingDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TrainingDto.prototype, "trainingName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TrainingDto.prototype, "instituteName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TrainingDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TrainingDto.prototype, "tariningDuration", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TrainingDto.prototype, "outcomeDetails", void 0);
class IdQuery {
}
exports.IdQuery = IdQuery;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdQuery.prototype, "contact", void 0);
class AddExpReqDto {
}
exports.AddExpReqDto = AddExpReqDto;
class SkillReqDto {
}
exports.SkillReqDto = SkillReqDto;
class PrevJobReqDto {
}
exports.PrevJobReqDto = PrevJobReqDto;
class TrainingReqDto {
}
exports.TrainingReqDto = TrainingReqDto;
class EIdQueryRequestDto {
}
exports.EIdQueryRequestDto = EIdQueryRequestDto;
class SIdQueryRequestDto {
}
exports.SIdQueryRequestDto = SIdQueryRequestDto;
class PJIdQueryRequestDto {
}
exports.PJIdQueryRequestDto = PJIdQueryRequestDto;
class TIdQueryRequestDto {
}
exports.TIdQueryRequestDto = TIdQueryRequestDto;
class ESIdQueryRequestDto {
}
exports.ESIdQueryRequestDto = ESIdQueryRequestDto;
//# sourceMappingURL=experience.dtos.js.map