var mongoose = require('mongoose');
var pecSchema = require('../schemas/pec');


module.exports = mongoose.model('Pec', pecSchema);