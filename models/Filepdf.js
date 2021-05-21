var mongoose = require('mongoose');
var filepdfSchema = require('../schemas/fliepdfs');


module.exports = mongoose.model('Filepdf', filepdfSchema);