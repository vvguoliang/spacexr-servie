var mongoose = require('mongoose');
var projectSchema = require('../schemas/projects');


module.exports = mongoose.model('Project', projectSchema);