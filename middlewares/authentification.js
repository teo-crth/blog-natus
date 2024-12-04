const auth = (request, response, next) => {
    if (request.session.user) {
        // On passe la main au middleware suivant si le user est bien loggé (ie, dans la session)
        return next();
    }

    // Sinon, on passe la main au middleware d'erreur (errorHandlers) qui s'occupe d'afficher l'erreur appropriée
    request.status = 403;
    return next(new Error('Forbidden'));
};

module.exports = auth;