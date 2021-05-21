var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    title: String,
    subtitle: String,
    url: String,
    pptdata: String,
    pptdate: String, //修改时间
    pptstarttime: String //开始时间
});
module.exports = schema;