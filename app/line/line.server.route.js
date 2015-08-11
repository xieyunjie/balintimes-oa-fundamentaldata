/**
 * Created by AlexXie on 2015/8/4.
 */
var express = require('express'),
    router = express.Router(),
    AuthCtrl = require("../authentication/authentication.server.controller"),
    LineCtrl = require("./line.server.controller");

module.exports = router;

router.all('*', AuthCtrl.IsAuth);

// '/'
router.get('/', LineCtrl.list);

router.post('/', LineCtrl.create);

// '/:uid'
router.get('/:uid', LineCtrl.findOne);

router.post('/:uid', LineCtrl.update);

router.delete("/:uid", LineCtrl.delete);