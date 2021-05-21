var mongoose = require('mongoose');
var goolgSchema = require('../schemas/goolgs');


module.exports = mongoose.model('Goolg', goolgSchema);