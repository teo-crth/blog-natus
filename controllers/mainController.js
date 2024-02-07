const { response } = require('express');
const articleData = require('../data/articles.json');
const nodemailer = require('nodemailer');

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
  get404Page: (request, response)=> {response.status(404).render('404', {statusCode: 404}) },
  sendMail: (request, response) => {
    const from = request.body.email;
    const to = 'teoconrath@gmail.com';
    const objet = request.body.objet;
    const message = request.body.message;
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'teoconrath@gmail.com', 
        pass: 'qlst qhsa mizc fbju'
      }
    });

    const mailOptions = {
      from: from,
      to: to,
      subject: objet,
      text: message
    }
    
    transporter.sendMail(mailOptions, function(error, info) {
      if(error){
        console.log(error)
      } else {
        console.log('Email send: ' + info.response)
      }
      response.redirect('/contact');
    });

  }
}

module.exports = mainController;