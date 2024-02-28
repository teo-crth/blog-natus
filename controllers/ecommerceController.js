const { Clients, Address } = require('../models');
const Books = require('../models/books');

const ecommerceController = {
    getBooksPage: async (request, response) => {
        const books = await Books.findAll();

        response.render(`books`, { books, cssFileBooks: 'books.css' }) 
    },
    getOneBookPage: async (request, response) => {
        const idOfOneBook = request.params.id;
        const book = await Books.findByPk(idOfOneBook);

        if(book) {
            response.render(`book`, { book, cssFileOneBook: 'book.css' }) 
        }
        response.status(404).render(`404`, { statusCode404: 404 }) 
        
    }
}

module.exports = ecommerceController;  