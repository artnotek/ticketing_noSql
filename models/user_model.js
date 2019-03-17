const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
   name: !String,
   lastName: !String,
   job: !String,
   assignedTickets: [String]
});

module.exports = mongoose.model('User',UserSchema);
