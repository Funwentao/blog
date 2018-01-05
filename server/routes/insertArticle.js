var express = require('express');
var router = express.Router();
var CollectionModel = require('../db/schema/collection');

/* GET home page. */
router.post('/', function(req, res, next) {
    var {collectionName} = req.body;
    CollectionModel.update({name:collectionName},{$push:{articles:{collectionName}}},function (err,docs) {
        if(err){
            res.send({status:0,msg:'失败'});
        }else{
            res.send({status:1});
        }
    })
});

module.exports = router;
