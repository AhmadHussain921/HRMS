"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    moduleNumber: {
        type: Number,
        default: 3,
        immutable: true,
    },
    subject: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
});
const LeaveReq = Schema;
exports.default = LeaveReq;
//# sourceMappingURL=leaveReq.schema.js.map