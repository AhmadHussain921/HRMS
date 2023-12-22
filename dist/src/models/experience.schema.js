"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Schema = new mongoose.Schema({
    moduleNumber: {
        type: Number,
        default: 1,
        immutable: true,
    },
    SKID: [
        {
            type: ObjectId,
            ref: 'Skills',
        },
    ],
    PJID: [
        {
            type: ObjectId,
            ref: 'PrevJobs',
        },
    ],
    TRID: [
        {
            type: ObjectId,
            ref: 'Trainings',
        },
    ],
});
const Experience = Schema;
exports.default = Experience;
//# sourceMappingURL=experience.schema.js.map