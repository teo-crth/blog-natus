// On se sert des locals pour pouvoir utiliser la variable user dans les views.
const loadUserToLocals = (req, res, next) => {
    if (req.session.user) {
      res.locals.user = req.session.user;
    } else {
      res.locals.user = null;
    }
  
    next();
  };
  
  module.exports = loadUserToLocals;