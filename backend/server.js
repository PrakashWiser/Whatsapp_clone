import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./db/connecrDataBase.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";
import path from "path";
dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
connectDb();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/", (req, res) => {
  res.send("Hii..");
});

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist", "index.html"))
  })
}

server.listen(PORT, () => {
  console.log(`🚀 Server Running on http://localhost:${PORT}`);
});
