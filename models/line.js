/**
 * Created by AlexXie on 2015/8/4.
 */

var db = require("../models/db");


/*user model*/
var Line = db.model('Line', new mongoose.Schema({
    uid: {
        type: String,
        unique: true
    },
    name: String,
    cityname: String,
    openingtime: Date
}));

module.exports = Line;
