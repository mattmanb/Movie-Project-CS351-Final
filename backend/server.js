const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

let Movie = require('./movie.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos1', { useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

todoRoutes.route('/').get(async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch(err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

todoRoutes.route('/:id').get(async (req, res) => {
    let id = req.params.id;
    try {
        const movie = await Movie.findById(id);
        res.json(movie);
    } catch(err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

todoRoutes.route('/delete/:id').post(async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMovie = await Movie.findByIdAndDelete(id);
        res.status(200).json({message: "Movie deleted"});
        console.log("movie removed!!!!!!");
    } catch(err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

todoRoutes.route('/add').post(function(req, res) {
    let move = new Movie(req.body);
    console.log(req.body);
    move.save()
        .then(movie => {
            res.status(200).json({'movie': 'movie added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

app.use('/todos', todoRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port:", PORT);
});