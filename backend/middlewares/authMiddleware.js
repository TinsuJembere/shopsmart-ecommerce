const jwt = require("jsonwebtoken");
require("dotenv").config();

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    console.log("Authorization Header:", authHeader);

    if (!authHeader) return res.status(401).json({ message: "Access Denied" });

    const token = authHeader.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Access Denied: Malformed Token" });
      }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Verified Token:", verified);
    req.user = verified;
    next()
  } catch (error) {
    console.log("Error:", error.message);
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = protect