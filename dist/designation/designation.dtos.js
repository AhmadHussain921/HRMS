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
exports.EDESGIdQueryReqDto = exports.DESGIdQueryReqDto = exports.EIdQueryReqDto = exports.IdQuery = exports.DesgReqDto = exports.DesignationDto = void 0;
const class_validator_1 = require("class-validator");
class DesignationDto {
}
exports.DesignationDto = DesignationDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DesignationDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DesignationDto.prototype, "deptName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", String)
], DesignationDto.prototype, "salary", void 0);
class DesgReqDto {
}
exports.DesgReqDto = DesgReqDto;
class IdQuery {
}
exports.IdQuery = IdQuery;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdQuery.prototype, "id", void 0);
class EIdQueryReqDto {
}
exports.EIdQueryReqDto = EIdQueryReqDto;
class DESGIdQueryReqDto {
}
exports.DESGIdQueryReqDto = DESGIdQueryReqDto;
class EDESGIdQueryReqDto {
}
exports.EDESGIdQueryReqDto = EDESGIdQueryReqDto;
//# sourceMappingURL=designation.dtos.js.map