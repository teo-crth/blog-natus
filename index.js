const express = require('express');
const app = express();
const router = require('./router');
const ejs = require('ejs');
const path = require('path');
require("dotenv").config();

// Setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

const PORT = process.env.PORT || 3000; 

// Setup body parser
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));

// mw de journalisation
app.use((request, response, next) => {
    // mise en place d'un gestionnaire d'évènement pour n'afficher le journal qu'une fois le cycle de vie de la requête terminée
    // cela permet d'afficher le bon code de status.
    request.on('end', function(){
      console.log(`${response.statusCode} - [${new Date().toISOString()} - ${request.ip}] ${request.path}`);
    })
    next();
  })

// Setup router
app.use(router);


app.listen(PORT, () => console.log(`vous écoutez le port : ${PORT}`));