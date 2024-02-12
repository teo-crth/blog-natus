const express = require('express');
const { getHomePage, getContactPage, getArticlesPage, getLexiquePage, getSingleArticle, get404Page, getYoutubePage } = require('./controllers/mainController');
const { sendMail } = require('./controllers/contactFormController');
const router = express.Router();


router.get('/article/:articleNumber', getSingleArticle);

router.get('/articles', getArticlesPage);

router.get('/lexique', getLexiquePage);

router.get('/nos-allies', getYoutubePage);

router.get('/contact', getContactPage);
router.post('/contact', sendMail);

// route pour l'affichage de la page d'accueil
router.get('/', getHomePage);


// A ENLEVER SI 404 BUG, CAR RAJOUTE APRES COUP SUITE A COURS 
router.use(get404Page);

module.exports = router;