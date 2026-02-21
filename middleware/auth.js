function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  next();
}

function isAdmin(req, res, next) {
  if (req.session.user.role !== 'admin') {
    return res.status(403).send("Access Denied");
  }
  next();
}

module.exports = { isAuthenticated, isAdmin };