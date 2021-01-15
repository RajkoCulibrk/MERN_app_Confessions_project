import express from "express";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import confessionRoutes from "./routes/confessions.js";
import likesRoutes from "./routes/likes.js";
import commentRoutes from "./routes/comments.js";
import db from "./config/db.js";

db();

const app = express();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("hello madafacka");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/confessions", confessionRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server started"));
