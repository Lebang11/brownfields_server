const mongoose = require('mongoose');

FormSchema = new mongoose.Schema({
    username: mongoose.SchemaTypes.String,
    previous: mongoose.SchemaTypes.String,
    current: mongoose.SchemaTypes.String,
    issues: mongoose.SchemaTypes.String,
    breakthroughs: mongoose.SchemaTypes.String,
    dateAdded: mongoose.SchemaTypes.Date
});

module.exports = mongoose.model('form', FormSchema);