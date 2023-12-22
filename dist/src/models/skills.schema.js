"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    moduleNumber: {
        type: Number,
        default: 1,
        immutable: true,
    },
    skillName: {
        type: String,
    },
    duration: {
        type: String,
    },
});
const Skills = Schema;
exports.default = Skills;
//# sourceMappingURL=skills.schema.js.map