/*
CREATE A BASIC SERVER
- Import express
- Define app & port
- Import database connection and store it in a variable & activate it var_name()
- Create a basic route (req('/'), res('Server is running ok')) 
- app.listen(port, () => {cons.log('okok')})

CONNECTION TO DATABASE
db.js
- Import mongoose
- Create a connection function (async) which is stored in a variable
  - Use mongoose.connect() to conect to mongodb
  - Provide a sucessful response (200) or Error message (500)


CREATING MODLES
- Import mongoose
- Create a variable that stores a model. use a mongoose.Schema function that creates model and gives it attributes
- Export the model using module.exports and give it the created model using mongoose.model('',variable that stores a mode)


CREATING CONTROLLERS TO PERFORM OPERATIONS USING MODELS (CRUD)
creating new record
 - objct d


ROUTING
*/
