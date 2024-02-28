const { Clients, Address } = require('../models');
const Books = require('../models/books');

const ecommerceController = {
    getBooksPage: async (request, response) => {
        try {
        const books = await Books.findAll();

        response.render(`books`, { books, cssFileBooks: 'books.css' }) 
    } catch (error) {
        console.log(error);
        response.status(500).send('Server Error');
    }
    },
    getOneBookPage: async (request, response) => {
        const idOfOneBook = request.params.id;
        const book = await Books.findByPk(idOfOneBook);

        if(book) {
            response.render(`book`, { book, cssFileOneBook: 'book.css' }) 
        }
        response.status(404).render(`404`, { statusCode404: 404 }) 
        
    },

    // PANIER
    getShoppingCart: (request, response) => {
        response.render(`shoppingCart`, { cssFileShoppingCart: 'shoppingCart.css' })
    },
    addOrUpdate: async (request, response) => {
        try {
            const bookId = parseInt(request.params.id);

            const booksInCart = request.session.cart.books;
            const bookToAdd = await Books.findOne({
                where: { id: bookId }
            })

            // Si on a déjà le livre dans le panier, on met à jour la quantité, sinon on ajoute le produit au panier
            const found = booksInCart.find(
                book => parseInt(book.id) === bookToAdd.id
            );

            if (found) {
                found['qty'] += 1;
                request.session.cart.books = booksInCart.map(book =>
                    book.id === found.id ? found : book
                );
            } else {
                booksInCart.dataValues['qty'] = 1;
                request.session.cart.books.push(booksInCart);
            }

            response.redirect('/livres/panier');
            console.log('Redirecting to /livres/panier');

        } catch (error) {
            console.error(error);
            response.status(500).send('Server Error');
        }
    },
    remove: (request, response) => {
        const bookId = parseInt(request.params.id);

        const booksInCart = request.session.cart.books;
        const newBook = booksInCart.filter(
            book => book.id !== bookId
        );

        request.session.cart.books = newBook;

        response.redirect('/livres/panier');
    },
    destroy: (request, response) => {
        request.session.cart = {};
        request.session.cart['books'] = [];
        response.locals.cart = request.session.cart;

        response.redirect('/livres/panier');
    }
}

module.exports = ecommerceController;  