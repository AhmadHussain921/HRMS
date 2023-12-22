"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Schema = new mongoose.Schema({
    moduleNumber: {
        type: Number,
        default: 3,
        immutable: true,
    },
    LRID: {
        type: ObjectId,
        ref: 'LeaveReq',
    },
    presentHours: [
        {
            type: String,
        },
    ],
    presentHoursTimeStamp: {
        type: Date,
        default: Date.now,
    },
    breakHour: [
        {
            type: String,
        },
    ],
    breakHourTimestamp: {
        type: Date,
        default: Date.now,
    },
});
const TimeAndAttendance = Schema;
exports.default = TimeAndAttendance;
//# sourceMappingURL=timeAndAttendance.schema.js.map