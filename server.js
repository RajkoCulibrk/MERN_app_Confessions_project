import express from "express";
import userRoutes from "./routes/users.js";

const app = express();

app.get("/", (req, res) => {
  res.send("hello madafacka");
});

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server started"));
