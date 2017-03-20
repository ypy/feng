var express = require('express');
var app = express();
var bodyParser = require('body-parser');


var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/test");


var Movie = require('./models');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;


var router = express.Router();

router.use(function (req, res, next) {
    console.log('Something is happening.');
    next();
});


router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/movies')
    .post(function (req, res) {
        let movie = new Movie(req.body);
        movie.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'movie created!' });
        });

    })
    .get(function (Req, res) {
        Movie.find(function (err, movies) {
            if (err) {
                return res.send(err);
            }
            res.json(movies);
        });
    });

router.route('/search/:title').get(function (req, res) {
    var regex = new RegExp(req.params.title, "i")
    Movie.find({ title: regex }, function (err, movies) {
        if (err) {
            return res.send(err);
        }
        res.json(movies);
    });
});

router.route('/movies/:id').put(function (req, res) {
    Movie.findOne({ _id: req.params.id }, function (err, movie) {
        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            movie[prop] = req.body[prop];
        }

        // save the movie
        movie.save(function (err) {
            if (err) {
                return res.send(err);
            }

            res.json({ message: 'Movie updated!' });
        });
    });
}).get(function (req, res) {
    Movie.findOne({ _id: req.params.id }, function (err, movie) {
        if (err) {
            return res.send(err);
        }

        res.json(movie);
    });
}).delete(function (req, res) {
    Movie.remove({
        _id: req.params.id
    }, function (err, movie) {
        if (err) {
            return res.send(err);
        }

        res.json({ message: 'Successfully deleted' });
    });
});

app.use('/api', router);


app.listen(port);
console.log('Magic happens on port ' + port);
