const express = require('express');
const { getHomePage, getContactPage, getArticlesPage, getLexiquePage, getSingleArticle, get404Page, getYoutubePage, getCategoryPage } = require('./controllers/mainController');
const { sendMail } = require('./controllers/contactFormController');
const { getBooksPage, getOneBookPage, getShoppingCart, addOrUpdate, getCheckoutPage, register, remove, getLoginPage } = require('./controllers/ecommerceController');
const router = express.Router();


router.get('/article/:articleName', getSingleArticle);

router.get('/articles', getArticlesPage);

router.get('/lexique', getLexiquePage);

router.get('/nos-allies', getYoutubePage);

router.get('/categorie/:categoryArticle', getCategoryPage);
router.get('/contact', getContactPage);
router.post('/contact', sendMail);

// route pour l'affichage de la page d'accueil
router.get('/', getHomePage);

// route pour les pages ecommerce
router.get('/livres/panier/:id', addOrUpdate);

router.get('/livres/panier/remove/:id', remove);

router.get('/livres/panier', getShoppingCart);

router.get('/livres', getBooksPage);
router.get('/livres/:id', getOneBookPage);

// Login 
router.get('/login', getLoginPage);
router.get('/login/success', register)

// Routes checkout
//router.get('/shop/checkout', getCheckoutPage);


// A ENLEVER SI 404 BUG, CAR RAJOUTE APRES COUP SUITE A COURS 
router.use(get404Page);

module.exports = router;