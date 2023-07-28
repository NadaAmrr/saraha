import { Schema, Types, model } from "mongoose";

  const msgSchema = new Schema(
    {
      content: {
        type: String,
        required: true,
        lowercase: true,
      },
      sendTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
    {
      timestamps: true,
    },
  )
  
const msgModel = model("Message", msgSchema);
export default msgModel;
