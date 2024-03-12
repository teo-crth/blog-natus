const nodemailer = require('nodemailer');
require('dotenv').config();

const contactFormController = {
sendMail: (request, response) => {
    const from = request.body.email;
    const to = process.env.mon_email;
    const objet = request.body.objet;
    const message = request.body.message;
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.mon_email, 
        pass: process.env.pass
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

module.exports = contactFormController;