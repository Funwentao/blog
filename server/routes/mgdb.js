var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/chenxjblog', {
    useMongoClient: true
}, (error) => {
    if (error) {
        (() => {
            console.log('fail to connect mongodb')
        })()
    } else {
        (() => {
            console.log('success to connect mongodb')
        })()
    }

});