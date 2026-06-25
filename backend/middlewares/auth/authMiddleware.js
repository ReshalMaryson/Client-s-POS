function checkAuth(req, res, next) {
  if (!req.session.user) {
    return res
      .status(401)
      .json({ message: "Un-Authorized User | Please Login" });
  }

  next();
}

module.exports = checkAuth;
