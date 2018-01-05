var express = require('express');
var router = express.Router();
var CollectionModel = require('../db/schema/collection');
var jwt = require('jsonwebtoken');

/* GET home page. */
router.post('/', function(req, res, next) {
    const decode = jwt.decode(req.body.token)
    CollectionModel.find({author:decode.userName},function(err,collections){
        res.send({collections:collections})
    })
});

module.exports = router;
