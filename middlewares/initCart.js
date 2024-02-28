const initCart = (request, response, next) => {
    response.locals.cart = null;

    if (!request.session.cart) {
        request.session.cart = {};
        request.session.cart['books'] = [];
    }

    if (request.session.cart && request.session.cart.books.length > 0) {
        response.locals.cart = request.session.cart;
    }

    next();
};

module.exports = initCart;