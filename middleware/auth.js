import jwt from "jsonwebtoken";

//for protectiong private routes checks if token has been provided in the header and if so verifies it, else sends a message that there is no token provided or that the token is not valid
export default (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
