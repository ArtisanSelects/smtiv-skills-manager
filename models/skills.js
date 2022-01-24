import mongoose from "mongoose";
const { Schema } = mongoose;

var SkillSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        target: {
            type: Schema.Types.ObjectId,
            ref: "Target",
            required: true
        },
        rank: {
            type: Number,
            min: 1,
            max: 31
        },
        element: {
            type: Schema.Types.ObjectId,
            ref: "Element",
            required: true
        },
    }
);

export default mongoose.model('Skill', SkillSchema);