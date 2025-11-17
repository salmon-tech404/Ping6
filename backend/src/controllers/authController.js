import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Session from "../models/Session.js";

const ACCESS_TOKEN_TTL = "30m";
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;
// SignUp AuthProcess
export const signUp = async (req, res) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;
    if (!username || !password || !email || !firstName || !lastName) {
      return res.status(400).json({
        message:
          "Không thể thiếu thông tin username, password, email, firstName, lastName",
      });
    }
    // Kiểm tra user có tồn tại chưa
    const duplicate = await User.findOne({ username });
    if (duplicate) {
      return res.status(409).json({ message: "Username đã tồn tại!" });
    }

    // Mã hóa password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    await User.create({
      username,
      hashedPassword,
      email,
      displayName: `${firstName} ${lastName}`,
    });

    // return
    return res.sendStatus(204);
  } catch (error) {
    console.error("Lỗi khi gọi signUp", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// SignIn AuthProcess
export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check username and password
    if (!username || !password) {
      return res.status(400).json({
        message: "Thiếu thông tin đăng nhập!",
      });
    }

    // Tìm user
    const user = await User.findOne({
      $or: [{ username: username }, { email: username }],
    });

    if (!user) {
      return res.status(401).json({
        message: "Người dùng không tồn tại!!!",
      });
    }

    // Check Password
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Mật khẩu không đúng!!!",
      });
    }

    // Tạo Token
    const accessToken = jwt.sign(
      { userId: user._id }, //đóng gói dữ liệu payload
      process.env.ACCESS_TOKEN_SECRET, //Ký token bằng secret key
      { expiresIn: ACCESS_TOKEN_TTL } //Thiết lập thời gian hết hạn
    );
    console.log("✅ Access token: ", accessToken);

    const refreshToken = crypto.randomBytes(64).toString("hex");
    console.log("✅ Refresh token: ", refreshToken);

    // Tạo session để lưu refresh token
    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
    });

    // Trả refresh token về trong cookies
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: REFRESH_TOKEN_TTL,
    });

    // Trả access Token trong res
    return res.status(200).json({
      message: `User: ${user.displayName} đã login thành công!`,
      accessToken,
    });
  } catch (error) {
    console.error("Lỗi khi gọi signIn", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
/* 

SignIn Process Flow:
- Kiểm tra input → nếu sai → return ngay
- Tìm user → nếu không có → return
- Check password → nếu sai → return
- Nếu tất cả đều qua → tạo token
- Lưu session
- Trả token 

*/

// SignOut AuthProcess
export const signOut = async (req, res) => {
  try {
    // 1. Lấy refresh token từ cookie, để user log-out thực sự
    const token = req.cookies?.refreshToken;

    // 2. check token
    if (token) {
      // Xóa refresh token trong session
      await Session.deleteOne({ refreshToken: token });

      // xóa cookie
      res.clearCookie("refreshToken");
    }

    // 3. Trả về kết quả
    return res.sendStatus(200);
  } catch (error) {
    console.error("Lỗi signOut", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
