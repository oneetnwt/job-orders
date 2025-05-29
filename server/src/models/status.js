import mongoose from "mongoose";

const statusSchema = new mongoose.Schema(
  {
    jobOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobOrder",
      required: true,
    },
    currentStatus: {
      type: String,
      enum: ["pending", "in-progress", "on-hold", "completed", "cancelled"],
      required: true,
    },
    newStatus: {
      type: String,
      enum: ["pending", "in-progress", "on-hold", "completed", "cancelled"],
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    remarks: {
      type: String,
      trim: true
    },
  },
  {
    timestamps: true,
  }
);

const Status = mongoose.model("Status", statusSchema);

export default Status;
