var mongoose = require('mongoose');
var filewordSchema = require('../schemas/filewords');


module.exports = mongoose.model('Fileword', filewordSchema);