var jwt = require("jwt-simple");
var moment = require("moment");
var config = require("../config/token");

exports.ensureAuthenticated = function (req, res, next) {
    console.log(req.headers);
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: "Your request doesn't have authorization header" });
  }

  var token = req.headers.authorization;
  console.log('configgg token ', config.TOKEN_SECRET);
  var payload = jwt.decode(token, config.TOKEN_SECRET, true);
console.log('payload ',payload);
  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: "Token have expired" });
  }

  req.user = payload.sub;
  next();
};