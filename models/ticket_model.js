const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
   title: !String,
   description: !String,
   sender: !String,
   assigned: !String,
   progress: !String,
   solution: String,


});

module.exports = mongoose.model('Ticket',TicketSchema);
