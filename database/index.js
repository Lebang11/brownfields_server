const mongoose = require('mongoose');


const MongoPassword = process.env.MongoPassword;

SESSION_SECRET = "1"
mongoose.connect(`mongodb+srv://lebang:${MongoPassword}@cluster0.wx6t6qd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(() => console.log('Connected to at DB'))
.catch((err) => console.log(err));


module.exports = mongoose;