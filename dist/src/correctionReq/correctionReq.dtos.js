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
exports.ECRIDQueryRequestDto = exports.CRIDQueryRequestDto = exports.EIdQueryRequestDto = exports.Id2Query = exports.IdQuery = exports.CorrectionReqRequestDto = exports.CorrectionReqDto = void 0;
const class_validator_1 = require("class-validator");
class CorrectionReqDto {
}
exports.CorrectionReqDto = CorrectionReqDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CorrectionReqDto.prototype, "subject", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CorrectionReqDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CorrectionReqDto.prototype, "status", void 0);
class CorrectionReqRequestDto {
}
exports.CorrectionReqRequestDto = CorrectionReqRequestDto;
class IdQuery {
}
exports.IdQuery = IdQuery;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdQuery.prototype, "id", void 0);
class Id2Query {
}
exports.Id2Query = Id2Query;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Id2Query.prototype, "id", void 0);
class EIdQueryRequestDto {
}
exports.EIdQueryRequestDto = EIdQueryRequestDto;
class CRIDQueryRequestDto {
}
exports.CRIDQueryRequestDto = CRIDQueryRequestDto;
class ECRIDQueryRequestDto {
}
exports.ECRIDQueryRequestDto = ECRIDQueryRequestDto;
//# sourceMappingURL=correctionReq.dtos.js.map