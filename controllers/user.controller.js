const User = require('../models/user_model.js');

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }
    // Create a user
    const user = new User({
        name: req.body.name || "Untitled User",
        lastName: req.body.lastName,
        job:req.body.job
    });
    // Save user in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

// Retrieve and return all User from the database.
exports.findAll = (req, res) => {

    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userid
exports.findOne = (req, res) => {
    User.findById(req.params.id)
   .then(user => {
       if(!user) {
           return res.status(404).send({
               message: "user not found with id " + req.params.id
           });
       }
       res.send(user);
   }).catch(err => {
       if(err.kind === 'ObjectId') {
           return res.status(404).send({
               message: "User not found with id " + req.params.id
           });
       }
       return res.status(500).send({
           message: "Error retrieving user with id " + req.params.id
       });
   });
};

// Update a user identified by the userid in the request
exports.update = (req, res) => {

    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.id, {
        name: req.body.name || "Untitled User",
        lastName: req.body.lastName,
        job:req.body.job
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'id') {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.id
        });
    });

};

// Delete a user with the specified userid in the request
exports.delete = (req, res) => {
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

};
