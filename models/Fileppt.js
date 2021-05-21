var mongoose = require('mongoose');
var filepptSchema = require('../schemas/flieppts');


module.exports = mongoose.model('Fileppt', filepptSchema);