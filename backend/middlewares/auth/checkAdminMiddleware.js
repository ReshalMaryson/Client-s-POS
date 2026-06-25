const User = require("../../models/userSchema");
async function checkAdmin(req, res, next) {
  if (!req.session.user) {
    return res
      .status(401)
      .json({ message: "CheckAdminMiddleware : Session not found" });
  }

  const Id = req.session.user.id;

  const user = await User.findOne({ _id: Id }).populate("roleid");
  if (user.role !== "admin") {
    return res.status(401).json({ message: "UnAuthorized  | Not An Admin" });
  }
  next();
}

module.exports = checkAdmin;
