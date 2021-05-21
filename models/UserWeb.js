var mongoose = require('mongoose');
var userwebSchema = require('../schemas/userwebs');


module.exports = mongoose.model('UserWeb', userwebSchema);