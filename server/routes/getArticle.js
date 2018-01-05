var express = require('express');
var router = express.Router();
var CollectionModel = require('../db/schema/collection');
var mongoose = require('mongoose');

/* GET home page. */
router.post('/', function(req, res, next) {
    let {id} = req.body;
    let _id = mongoose.mongo.ObjectId(id)
    CollectionModel.findOne({"articles._id":_id},{"articles.$":1},function(err,articles){
        res.send(articles);
    })
});
module.exports = router;
