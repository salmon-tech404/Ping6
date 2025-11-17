import mongoose from "mongoose";

// Khai báo Schema cho User
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String, // Kiểu dữ liệu là String
      require: true, // Trường này là bắt buộc
      unique: true, // Giá trị phải là duy nhất
      trim: true, // Loại bỏ khoảng trắng thừa ở đầu và cuối
      lowercase: true, //Đưa về chữ thường
      minlength: 3, // Độ dài tối thiểu của username
      maxlength: 50, // Độ dài tối đa của username
    },
    hashedPassword: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    displayName: {
      type: String,
      require: true,
      trim: true,
    },
    avataUrl: {
      type: String, //Link CDN để hiển thị hình
      default: "", // Giá trị mặc định nếu không có avatar
    },
    avataId: {
      type: String, //Link CDN để hiển thị hình
    },
    bio: {
      type: String,
      maxlength: 500,
      default: "", // Giá trị mặc định
    },
    phoneNumber: {
      type: String,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

// Tạo model từ schema
const User = mongoose.model("User", UserSchema);

// Export model để có thể sử dụng ở nơi khác
export default User;
