const express = require('express');
const { getHomePage, getContactPage, getArticlesPage, getLexiquePage, getSingleArticle, get404Page, getYoutubePage, getCategoryPage } = require('./controllers/mainController');
const { sendMail } = require('./controllers/contactFormController');
const { getBooksPage, getOneBookPage, getShoppingCart, addOrUpdate, getCheckoutAddressPage, register, remove, getLoginPage } = require('./controllers/ecommerceController');

const router = express.Router();

router.get('/article/:articleName', getSingleArticle);

router.get('/articles', getArticlesPage);

router.get('/lexique', getLexiquePage);

router.get('/nos-allies', getYoutubePage);

router.get('/categorie/:categoryArticle', getCategoryPage);
router.get('/contact', getContactPage);
router.post('/contact', sendMail);

router.get('/', getHomePage);

// ecommerce pages
router.get('/livres/panier/:id', addOrUpdate);

router.get('/livres/panier/remove/:id', remove);

router.get('/livres/panier', getShoppingCart);

router.get('/livres', getBooksPage);
router.get('/livres/:id', getOneBookPage);

// Login 
router.get('/login', getLoginPage);
router.post('/login', register)

// checkout pages
router.get('/shop/checkoutAddress', getCheckoutAddressPage);

// 404
router.use(get404Page);

module.exports = router;