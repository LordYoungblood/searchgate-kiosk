const jwt = require("jsonwebtoken");


// ----- Auth middleware to verify token and add user to req object -----------------//
const auth = async (req, res, next) => {

    const authHeader = req.cookies.auth;
    console.log("auth header.. auth middleware", authHeader);
    try {
      if (!authHeader) {
        return res.status(401).json({ message: "No token, authorization denied" });
      }

      const token = jwt.verify(authHeader, process.env.JWT_SECRET);
      console.log("token from auth middleware", token);
      req.user = token.id;

      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = auth;
