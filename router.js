const express = require('express');
const articleData = require('./data/articles.json');
const path = require('path')
const { getHomePage, getContactPage, getArticlesPage, getLexiquePage, getSingleArticle, get404Page } = require('./controllers/mainController')
const router = express.Router();


router.get('/article/:articleNumber', getSingleArticle);

router.get('/articles', getArticlesPage);

router.get('/lexique', getLexiquePage);

router.get('/contact', getContactPage);

// route pour l'affichage de la page d'accueil
router.get('/', getHomePage);


// A ENLEVER SI 404 BUG, CAR RAJOUTE APRES COUP SUITE A COURS 
router.use(get404Page);

module.exports = router;