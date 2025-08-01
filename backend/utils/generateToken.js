import jwt from "jsonwebtoken";
const generateToken = (userId, res) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET || "defaultSecret",
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // Required for HTTPS
    sameSite: "None", // Also required for cross-origin
  });

  if (process.env.NODE_ENV !== "production") {
    console.log("Generated JWT:", token);
  }

  return token;
};

export default generateToken;
