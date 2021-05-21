var mongoose = require('mongoose');
var webmodelchema = require('../schemas/webmodels');


module.exports = mongoose.model('Webmodels', webmodelchema);