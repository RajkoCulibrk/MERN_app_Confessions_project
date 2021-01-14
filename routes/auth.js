import express from "express";

const router = express.Router();
// get logged in user
router.get("/", (req, res) => {
  res.send("get a user");
});

//login user
router.get("/", (req, res) => {
  res.send("Login user");
});

export default router;
