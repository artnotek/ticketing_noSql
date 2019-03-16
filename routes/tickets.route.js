module.exports = (app) => {
   const ticket = require('../controllers/ticket.controller.js');

   // création d'un tickets
   app.post('/tickets', ticket.create);

   // recupération de tout les Users
   app.get('/tickets', ticket.findAll);

   //récupération des infos d'un seul utilisateur
   app.get('/ticket/:id', ticket.findOne);

   // //Maj d'un utilisateur avec identifiant
   app.put('/ticket/:id', ticket.update);
   //
   // //suppression d'un utilisateur
   app.delete('/ticket/:id', ticket.delete);
}
