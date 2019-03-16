module.exports = (app) => {
   const User = require('../models/user_model.js');

   // Create a new user
   app.post('/users', function(req,res){
      console.log(req.body.user.name);
      if(!req.body.user.name) {
         return res.status(400).send({
             message: "user content can not be empty"
         });
     }
     const user = new User({
         name: req.body.user.name ,
         lastName: req.body.user.lastName,
         job:req.body.user.job
     });
     // Save user in the database
     user.save()
     .then(data => {
        console.log(data)
         res.send(data);
     }).catch(err => {
         res.status(500).send({
             message: err.message || "Some error occurred while creating the user."
         });
     });
   });

   // Retrieve all users
   app.get('/users', function(req,res){
      User.find()
      .then(users => {
          res.send(users);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving users."
          });
      });
   });

   // Delete a user with userid
   app.delete('/users/:id', function(req,res){
      console.log(req.params.id)
      User.findByIdAndRemove(req.params.id)
         .then(user => {
            if(!user) {
                  return res.status(404).send({
                     message: "User not found with id " + req.params.id
                  });
            }
            res.send({message: "User deleted successfully!"});
         }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                  return res.status(404).send({
                     message: "user not found with id " + req.params.id
                  });
            }
            return res.status(500).send({
                  message: "Could not delete user with id " + req.params.id
            });
         });
   });
}