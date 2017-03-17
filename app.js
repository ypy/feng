var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');


var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/test");


var User = require('./models');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;      


var router = express.Router();              

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next(); 
});


router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/user')   
    .post(function(req, res) {
        
        var user = new User();      
        user.name = req.body.name; 
        user.age=req.body.age;
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'user created!' });
        });
        
    });

app.use('/api', router);


app.listen(port);
console.log('Magic happens on port ' + port);
