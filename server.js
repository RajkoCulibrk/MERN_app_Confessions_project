import express from "express";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import confessionRoutes from "./routes/confessions.js";
import likesRoutes from "./routes/likes.js";
import commentRoutes from "./routes/comments.js";
import db from "./config/db.js";
import path from "path";
db();

const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.json({ extended: false }));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/confessions", confessionRoutes);
app.use("/api/likesdislikes", likesRoutes);
app.use("/api/comments", commentRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
