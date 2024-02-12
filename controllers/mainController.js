const { response } = require('express');
const articleData = require('../data/articles.json');
const youtubeChanelsData = require('../data/youtubeChanels.json');

const mainController = {
  getHomePage : (request, response) => { response.render('index', { articleData }) },
  getContactPage: (request, response)=> { let URL = request.url; response.render(`contact`, {URL, articleData}) },
  getArticlesPage: (request, response)=> { let URL = request.url; response.render(`articles`, {URL, articleData}) },
  getLexiquePage: (request, response)=> { let URL = request.url; response.render(`lexique`, {URL, articleData}) },
  getYoutubePage: (request, response)=> { let URL = request.url; response.render(`nos-allies`, {URL, youtubeChanelsData }) },
  getSingleArticle: (request, response, next) => {
    const articleNumber = request.params.articleNumber;
    const selectedArticle = articleData.find((article, index) => index === parseInt(articleNumber));
    let URL = request.url;
    if(!selectedArticle){
      return next();
    }
     return response.render('un-article', { URL, selectedArticle, cssFile: "/css/un_article.css" })
  }, 
  get404Page: (request, response)=> {response.status(404).render('404', {statusCode: 404}) }
}

module.exports = mainController;