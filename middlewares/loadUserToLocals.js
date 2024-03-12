// On se sert des locals pour pouvoir utiliser la variable user dans les views.
const loadUserToLocals = (request, response, next) => {
    if (request.session.user) {
      response.locals.user = request.session.user;
    } else {
      response.locals.user = null;
    }
  
    next();
  };
  
  module.exports = loadUserToLocals;