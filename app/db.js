/**
 * Created by AlexXie on 2015/8/4.
 */

mongoose = require('mongoose'),
    config = require('../config/config');

mongoose.connect('mongodb://' + config.host + ':' + config.port + '/' + config.db);

module.exports = mongoose;