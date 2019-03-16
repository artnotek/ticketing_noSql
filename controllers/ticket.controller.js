const Ticket = require('../models/ticket_model.js');

// Create and Save a new ticket
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "ticket content can not be empty"
        });
    }
    // Create a ticket
    const ticket = new Ticket({
        title: req.body.title || "Untitled Ticket",
        description: req.body.description,
        userName:req.body.userName,
        assigned:req.body.assigned,
        progress:req.body.progress,
    });
    // Save ticket in the database
    ticket.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the ticket."
        });
    });
};

// Retrieve and return all Ticket from the database.
exports.findAll = (req, res) => {

    Ticket.find()
    .then(tickets => {
        res.send(tickets);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tickets."
        });
    });
};

// Find a single ticket with a ticketid
exports.findOne = (req, res) => {
    Ticket.findById(req.params.id)
   .then(ticket => {
       if(!ticket) {
           return res.status(404).send({
               message: "ticket not found with id " + req.params.id
           });
       }
       res.send(ticket);
   }).catch(err => {
       if(err.kind === 'ObjectId') {
           return res.status(404).send({
               message: "Ticket not found with id " + req.params.id
           });
       }
       return res.status(500).send({
           message: "Error retrieving ticket with id " + req.params.id
       });
   });
};

// Update a ticket identified by the ticketid in the request
exports.update = (req, res) => {

    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Ticket content can not be empty"
        });
    }

    // Find ticket and update it with the request body
    Ticket.findByIdAndUpdate(req.params.id, {
        name: req.body.name || "Untitled Ticket",
        ticketname: req.body.ticketname,
        website:req.body.website
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

};

// Delete a ticket with the specified ticketid in the request
exports.delete = (req, res) => {
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

};
