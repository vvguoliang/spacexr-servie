var mongoose = require('mongoose');
var fileexcelSchema = require('../schemas/fileexcels');


module.exports = mongoose.model('Fileexcel', fileexcelSchema);