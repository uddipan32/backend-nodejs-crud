const jwt = require("jsonwebtoken");

function isLoggedIn(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ status: 401, message: "Unauthorized" });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    console.log("==== ERROR - CURRENT USER ====\n Date: ", Date(), "\n", error);
    return res.status(401).json({ status: 401, message: "Unauthorized" });
  }
}

function generateToken(payload) {
  try {
    const token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    return { token: "" };
  }
}

module.exports = { isLoggedIn, generateToken };
