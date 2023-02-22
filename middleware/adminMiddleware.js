
const isAdmin = (req,res,next) => {
    const user = req.session.user
      if(user.userType == 1)
      {
        next();
      }else{
        res.redirect('/')
      }
  }
  export default isAdmin;