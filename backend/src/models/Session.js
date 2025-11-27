import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //trỏ đến một document trong collection User
      require: true,
      index: true,
    },
    refreshToken: {
      type: String,
      require: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// Tự động xóa khi hết hạn
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

//Tạo ra một Model tên “Session” dựa trên sessionSchema.
const Session = mongoose.model("Session", sessionSchema);

// Export module
export default Session;
