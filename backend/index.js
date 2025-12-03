import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongos.config.js";
import user_route from "./routes/authRoutes.js";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => res.send("Fitness API running"));
app.use("/api/auth", user_route);

app.listen(5000, () => {
  connectDB();
  console.log("Server running on port 5000");
});
