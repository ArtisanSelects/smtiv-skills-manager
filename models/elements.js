import mongoose from "mongoose";
const { Schema } = mongoose;

var ElementSchema = new Schema(
    {
        name: { type: String,
                required: true }
    }
);

export default mongoose.model('Element', ElementSchema);