const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config");

const getUserId = (req) => {
  try {
    const { authorization } = req.headers;

    if (!RegExp(/^Bearer /).test(authorization))
      throw new Error("UnauthorizedError");
    const token = authorization.replace(/^Bearer /, "");

    const { sub: userId } = jwt.verify(token, JWT_SECRET);
    return userId;
  } catch (err) {
    console.error(err);
  }
  return undefined;
};

const auth = (req, res, next) => {
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).send({
      message:
        "Unauthorized. This means you are either missing the JWT token, the token is not being passed the right way or your token has expired. If you restarted the server, you will need signin again and get another JWT token.",
    });
  } else next();
};

module.exports = { getUserId, auth };
