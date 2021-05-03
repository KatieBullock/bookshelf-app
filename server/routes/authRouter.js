const express = require("express");
const jwt = require("jsonwebtoken");

const Users = require("../models/Users");

const methodNotAllowedError = require("../errors/methodNotAllowed");
const { auth } = require("../middleware/auth");

const { JWT_SECRET, JWT_EXPIRY_IN_MILLISECONDS } = require("../config");

const router = express.Router();

const generateToken = (userId) => {
  return jwt.sign({ sub: userId }, JWT_SECRET, {
    expiresIn: `${JWT_EXPIRY_IN_MILLISECONDS}ms`,
  });
};

router.use((req, res, next) => {
  if (/\/signout/.test(req.path)) {
    return auth(req, res, next);
  }
  next();
});

router
  .route("/signin")
  .post((req, res) => {
    // Slowing down so that you can see if the button has been disabled
    setTimeout(() => {
      const { username = undefined, password = undefined } = req.body;

      if (!username || !password) {
        return res.status(400).send({
          message:
            "Pst! You are missing something in your request. Do you have a 'Content-Type' header and is it 'application/json?' Are you sending JSON? Is the username and password a part of the request?",
        });
      }

      const user = Users.findByCredentials(username, password);
      if (!user)
        return res.status(401).send({
          message: "Unauthorized. Your username or password is not correct.",
        });

      const userId = user.id.toString();
      req.session.userId = userId;

      return res.status(200).send({
        message: "You did it! Success!",
        token: generateToken(userId),
      });
    }, 500);
  })
  .all(methodNotAllowedError);

router
  .route("/signout")
  .delete((req, res) => {
    // TODO require JWT
    if (req.session) req.session.destroy();

    return res.status(200).send({
      message: "You did it! Success!",
    });
  })
  .all(methodNotAllowedError);

router
  .route("/refresh")
  .get((req, res) => {
    const sendUnauthorized = () =>
      res.status(401).send({
        message:
          "Unauthorized. This means that you do not have a session or your session expired. (Your session will be lost when you restart the authentication server). To renew your session, you will need to signin again.",
      });

    if (!req.session || !req.session.userId) return sendUnauthorized();
    const user = Users.find(req.session.userId);
    if (!user) return sendUnauthorized();

    return res.status(200).send({
      message: "You did it! Success!",
      token: generateToken(req.session.userId),
    });
  })
  .all(methodNotAllowedError);

module.exports = router;
