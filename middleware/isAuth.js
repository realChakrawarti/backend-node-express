const isAuth = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.redirect("/")
  }
  next()
}

export default isAuth
