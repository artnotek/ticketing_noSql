module.exports = (app) => {
   const user = require('../controllers/user.controller.js');

   // Create a new user
   app.post('/users', user.create);

   // Retrieve all users
   app.get('/users', user.findAll);

   // Retrieve a single user with noteId
   app.get('/users/:id', user.findOne);

   // Update a user with userid
   app.put('/users/:id', user.update);

   // Delete a user with userid
   app.delete('/users/:id', user.delete);
}