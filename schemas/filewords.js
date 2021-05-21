var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    title: String,
    subtitle: String,
    worddata: String,
    worddate: String, //修改时间
    wordstarttime: String //开始时间
});
module.exports = schema;