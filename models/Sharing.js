var mongoose = require('mongoose');
var sharingSchema = require('../schemas/sharings');


module.exports = mongoose.model('Sharing', sharingSchema);