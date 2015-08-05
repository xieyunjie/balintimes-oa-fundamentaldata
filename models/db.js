/**
 * Created by AlexXie on 2015/8/4.
 */

mongoose = require('mongoose');
mongoose.connect('mongodb://172.16.0.250/my-website');

module.exports = mongoose;