import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    receiverId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      minLength: 2,
      maxLength: 10000,
      required: function () {
        return !this.attachments?.length;
      },
    },
    attachments: {
      type: [{
        public_id : String,
        secure_url : String,
      }],
    },
  },
  {
    timestamps: true,
    strict: true,
    strictQuery: true,
  },
);
export const MessageModel =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);
