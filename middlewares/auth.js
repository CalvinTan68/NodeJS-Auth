const jwt = require("jsonwebtoken");

const secret = process.env.SECRET_KEY;

module.exports = {
  auth: (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
      res.status(401).json({ msg: "Authorization denied, no token provided" });
    }
    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded.userId;
      next();
    } catch (error) {
      res.status(401).json({ msg: "Token is not valid" });
    }
  },
};
