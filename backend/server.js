import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./db/connecrDataBase.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://whatsapp-client-nine.vercel.app",
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
connectDb();

app.get("/", (req, res) => {
  res.send("Hii..");
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

server.listen(PORT, () => {
  console.log(`🚀 Server Running on http://localhost:${PORT}`);
});
