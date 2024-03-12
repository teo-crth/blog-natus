require("dotenv").config();

const express = require('express');
const app = express();
const router = require('./router');
const ejs = require('ejs');
const path = require('path');
const session = require('express-session')



// Local imports
const loadUserToLocals = require('./middlewares/loadUserToLocals');
const errorHandlers = require('./middlewares/errorHandlers');
const initCart = require('./middlewares/initCart');


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


// SESSIONS
app.use(session({
  secret: 'asdfgh789662cgbh', // clé de chiffrement on peut utiliser process.env.SESSION_SECRET
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false } // on définit si les cookies doivent etre envoyés uniquement via HTTPS en prod il faudra mettre true mais en local false
}));
app.use(initCart);
app.use(loadUserToLocals);

// Setup router
app.use(router);


// -- ERREURS --
// middleware 404
app.use(errorHandlers.notFound);
// middleware formatage et affichage des erreurs
app.use(errorHandlers.developmentErrors);

app.listen(PORT, () => console.log(`vous écoutez le port : ${PORT}`));