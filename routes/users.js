import express from "express";

const router = express.Router();
// register a user
router.post("/", (req, res) => {
  res.send("Registers a user");
});

export default router;
