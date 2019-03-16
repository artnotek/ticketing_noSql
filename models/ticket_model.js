const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
   title: !String,
   description: !String,
   userName: !String,
   assigned: !String,
   progress: !String 


});

module.exports = mongoose.model('Ticket',TicketSchema);
