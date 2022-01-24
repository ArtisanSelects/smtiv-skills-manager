import mongoose from "mongoose";
const { Schema } = mongoose;

var TargetSchema = new Schema(
    {
        name: { type: String,
                required: true }
    }
);

export default mongoose.model('Target', TargetSchema);