const checkLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
    }
};
const isLogin = (req, res, next) => {
    if (!req.session.user) {
      next()
    }
    else {
        res.redirect("/dashboard");
    }
};
const isAdmin = (req,res,next) => {
  const user = req.session.user
    if(user.userType == 1)
    {
      next();
    }else if(user.userType == 2){
      res.redirect('/dashboard')
    }
    else{
      res.redirect('/')
    }
}

export { checkLogin, isLogin,isAdmin };
