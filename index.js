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

// mw journalisation
app.use((request, response, next) => {
    request.on('end', function(){
      console.log(`${response.statusCode} - [${new Date().toISOString()} - ${request.ip}] ${request.path}`);
    })
    next();
  })

// SESSIONS
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false } // manage if cookie sent only with HTTPS in prod we will use true and in dev we use false
}));
app.use(initCart);
app.use(loadUserToLocals);

// Setup router
app.use(router);

// -- ERRoRS --

// middleware 404
app.use(errorHandlers.notFound);
// middleware errors display
app.use(errorHandlers.developmentErrors);

app.listen(PORT, () => console.log(`serveur lancé : http://localhost:${PORT}`));

module.exports = app;