const express = require('express');
const articleData = require('./data/articles.json');
const path = require('path')

const router = express.Router();

// route pour l'affichage de la page d'accueil
router.get('/', (request, response) => {
  response.render('index', { articleData });
});

router.get('/articles', (req, res)=> {
    let URL = req.url;
    res.render(`articles`, {URL, articleData});
});

router.get('/lexique', (req, res)=> {
    let URL = req.url;
    res.render(`lexique`, {URL, articleData});
});

router.get('/contact', (req, res)=> {
    let URL = req.url;
    res.render(`contact`, {URL, articleData});
});

router.get('/a-propos', (req, res)=> {
    let URL = req.url;
    res.render(`a-propos`, {URL, articleData});
});

router.get('/article/:articleNumber', (request, response, next) => {
    const articleNumber = request.params.articleNumber;
    const selectedArticle = articleData.find((article, index) => index === parseInt(articleNumber));
    if(!selectedArticle){
      return next();
    }
    return response.render('un-article', { selectedArticle });
});


router.use((request, response) => {
    response.status(404).render('404', {statusCode: 404});
});

  
  module.exports = router;