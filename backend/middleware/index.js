const jwt = require("jsonwebtoken");
const { JWTKEY } = require("../constant");

function extractToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

function checkLogin(req, res, next) {
  let token = extractToken(req);

  jwt.verify(token, JWTKEY, function (err, decoded) {
    if (err) {
      res.status(400).json({ error: err, isError: true });
    } else {
      req.decoded = decoded;
      next();
    }
  });
}

module.exports = {
  checkLogin: checkLogin,
};
