const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  //check header
  
  // if (res.status === 200){
  const authHeader = req.header.authorization;
  console.log("auth header.. auth middleware", authHeader);
  next();
  // }
  // token = authHeader.split(" ")[1];
  // console.log("token from auth middleware", token);
  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   res.status(401).json({ msg: "No token, authorization denied" });
  // }
  // const token = authHeader.split(" ")[1];
  // try {
  //   const payload = jwt.verify(token, process.env.JWT_SECRET);
  //   req.user = { id: payload.id };
  //   console.log("working on auth");
  //   next();
  // } catch (err) {
  //   res.status(401).json({ msg: "Token is not valid" });
  // }
};

module.exports = auth;
