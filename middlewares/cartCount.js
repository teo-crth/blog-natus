const cartCalculations = (req, res, next) => {
    // Initialisation du nombre total d'articles dans le panier à 0
    req.app.locals.cartCount = 0;
    
    // Calcul des totaux si le panier n'est pas vide
    if (req.session.cart.books.length > 0) {
        // Calcul du total HT du panier en utilisant la méthode reduce
        const totalHT = req.session.cart.books.reduce(
            (acc, book) => (acc += book.price * book.qty),
            0
        );

        // Calcul du nombre total d'articles dans le panier en utilisant la méthode reduce
        const totalCount = req.session.cart.books.reduce(
            (acc, book) => (acc += book.qty),
            0
        );

        // Attribution du nombre total d'articles dans le panier à req.app.locals.cartCount
        req.app.locals.cartCount = totalCount;
    }

    next();
};

module.exports = cartCalculations;
