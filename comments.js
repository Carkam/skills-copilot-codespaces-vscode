// Create web server

// Import module
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Set middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Array to store comment
var comments = [];

// Get comment from file
fs.readFile('./data/comment.txt', 'utf8', function (err, data) {
    if (err) throw err;
    comments = JSON.parse(data);
});

// Get request from client
app.get('/', function (req, res) {
    res.render('home', { comments: comments });
});

// Post request from client
app.post('/', function (req, res) {
    // Get data from client
    var name = req.body.name;
    var content = req.body.content;

    // Create comment object
    var comment = {
        name: name,
        content: content
    };

    // Add comment to array
    comments.push(comment);

    // Write comment to file
    fs.writeFile('./data/comment.txt', JSON.stringify(comments), function (err) {
        if (err) throw err;
    });

    res.redirect('/');
});

// Open server on port 3000
app.listen(3000, function () {
    console.log('Server is listening on port 3000!');
});