import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET || "defaultSecret",
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  });

  if (process.env.NODE_ENV !== "production") {
    console.log("Generated JWT:", token);
  }

  return token;
};

export default generateToken;
