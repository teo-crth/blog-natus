const articleData = require('../data/articles.json');

const mainController = {
  getHomePage : (request, response) => { response.render('index', { articleData }) },
  getContactPage: (request, response)=> { let URL = request.url; response.render(`contact`, {URL, articleData}) },
  getArticlesPage: (request, response)=> { let URL = request.url; response.render(`articles`, {URL, articleData}) },
  getLexiquePage: (request, response)=> { let URL = request.url; response.render(`lexique`, {URL, articleData}) },
  getSingleArticle: (request, response, next) => {
    const articleNumber = request.params.articleNumber;
    const selectedArticle = articleData.find((article, index) => index === parseInt(articleNumber));
    if(!selectedArticle){
      return next();
    }
     return response.render('un-article', { selectedArticle })
  }, 
  get404Page: (request, response)=> {response.status(404).render('404', {statusCode: 404}) }
}

module.exports = mainController;