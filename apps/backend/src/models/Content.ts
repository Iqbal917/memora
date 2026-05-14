import mongoose, {Schema, model} from "mongoose";

const ContentSchema = new Schema({
    title: String,
    link: String,
    type: String,
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: "tag"}],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
})

const ContentModel = model("Content", ContentSchema);
export default ContentModel;