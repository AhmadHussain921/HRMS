"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    moduleNumber: {
        type: Number,
        default: 2,
        immutable: true,
    },
    subject: {
        type: String,
        required: true,
        default: '',
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        default: 0,
        enum: [0, 1, 2],
    },
});
const CorrectionReq = Schema;
exports.default = CorrectionReq;
//# sourceMappingURL=correctionReq.schema.js.map