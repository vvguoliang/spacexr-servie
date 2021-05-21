var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    pId: String,
    hId: String,
    html: String,
    datetime: String, //修改时间
    starttime: String //开始时间
});
module.exports = schema;