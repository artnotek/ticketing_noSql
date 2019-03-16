module.exports = (app) => {
   const Ticket = require('../models/ticket_model.js');


   // Create a new ticket
   app.post('/tickets', function(req,res){
      if(!req.body.ticket.title) {
         return res.status(400).send({
             message: "ticket content can not be empty"
         });
     }
     const ticket = new Ticket({
         title: req.body.ticket.title ,
         description: req.body.ticket.description,
         ticketId:req.body.ticket.ticketId,
         assigned:req.body.ticket.ticketId,
         progress: req.body.ticket.progress,
         solution:req.body.ticket.solution
     });
     // Save ticket in the database
     ticket.save()
     .then(data => {
        console.log(data)
         res.send(data);
     }).catch(err => {
         res.status(500).send({
             message: err.message || "Some error occurred while creating the ticket."
         });
     });
   });

   // Retrieve all tickets
   app.get('/tickets', function(req,res){
      Ticket.find()
      .then(tickets => {
          res.send(tickets);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving tickets."
          });
      });
   });

   //récupération des infos d'un seul utilisateur
   app.get('/tickets/:id', function(req,res){

   });

   // //Maj d'un utilisateur avec identifiant
   app.put('/tickets/:id', function(req,res){
       // Validate Request
    

      // Find ticket and update it with the request body
      Ticket.findByIdAndUpdate(req.params.id, {
            progress: req.body.ticket.progress,
            assigned:req.body.ticket.assigned,
            solution:req.body.ticket.solution
      }, {new: true})
      .then(ticket => {
            if(!ticket) {
               return res.status(404).send({
                  message: "Ticket not found with id " + req.params.id
               });
            }
            res.send(ticket);
      }).catch(err => {
            if(err.kind === 'id') {
               return res.status(404).send({
                  message: "ticket not found with id " + req.params.id
               });
            }
            return res.status(500).send({
               message: "Error updating ticket with id " + req.params.id
            });
      });
   });

   // Delete a ticket with ticketid
   app.delete('/tickets/:id', function(req,res){
      console.log(req.params.id)
      Ticket.findByIdAndRemove(req.params.id)
         .then(ticket => {
            if(!ticket) {
                  return res.status(404).send({
                     message: "Ticket not found with id " + req.params.id
                  });
            }
            res.send({message: "Ticket deleted successfully!"});
         }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                  return res.status(404).send({
                     message: "ticket not found with id " + req.params.id
                  });
            }
            return res.status(500).send({
                  message: "Could not delete ticket with id " + req.params.id
            });
         });
   });
}
