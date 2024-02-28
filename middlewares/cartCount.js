const cartCalculations = (req, res, next) => {
    //
    req.app.locals.cartCount = 0;
    //calcul des totaux
    if (req.session.cart.books.length > 0) {
        // Des bons cas d'utilisation de reduce
        const totalHT = req.session.cart.books.reduce(
            (acc, book) => (acc += book.price * book.qty),
            0
        );

        req.app.locals.cartCount = req.session.cart.books.reduce(
            (acc, book) => (acc += book.qty),
            0
        );
    }

    next();
};

module.exports = cartCalculations;