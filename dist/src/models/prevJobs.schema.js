"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    moduleNumber: {
        type: Number,
        default: 1,
        immutable: true,
    },
    jobTitle: {
        type: String,
    },
    companyName: {
        type: String,
    },
    companyContact: {
        type: String,
    },
    salary: {
        type: Number,
        double: true,
        default: 0,
    },
});
const PrevJobs = Schema;
exports.default = PrevJobs;
//# sourceMappingURL=prevJobs.schema.js.map