export const authMe = async (req, res) => {
  try {
    const user = req.user;

    // Trường hợp user không tồn tại (hiếm gặp)
    if (!user) {
      return res.status(401).json({
        message: "Không tìm thấy user",
      });
    }

    // Trả profile user
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Error in authMe:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const test = async (req, res) => {
  return res.sendStatus(204);
};
