
var express = require('express');
var fs = require('fs');
var request = require('request');
var ejs = require('ejs');
var app = express();
var bodyParser = require('body-parser');
var urlencodedBodyParser = bodyParser.urlencoded({
    extended: false
});
app.use(urlencodedBodyParser);
app.set("view_engine", "ejs");
app.use(express.static('public'));

var index = fs.readFileSync('index.ejs', 'utf8')

//Code

function getLetters() {
    var data = fs.readFileSync('letters.json', 'utf8');
    var letters = JSON.parse(data);
    return letters;
}

function makeNewId(array) {
    var newId = 0;
    if (array.length === 0) {
        return newId;
    } else {
        var currentId = array[array.length - 1].id;
        newId = currentId + 1;
        return newId;
    }
}

app.get('/letters/new', function (req, res) {
    res.send(index);
});

app.get('/letters', function(req,res){
    
    var letters = getLetters();
    res.render('showall.ejs', {letters: letters});
});

app.get('/letters/:id', function (req, res) {

    var letters = getLetters();
    letters.forEach(function (letter) {
        if (letter.id.toString() === req.params.id) {
            res.render('showletter.ejs', {letters: letter});
        };
    });
});

app.get('/', function (req, res) {
    res.redirect('/letters/new')
});

app.post('/forminput', function (req, res) {

    var letters = getLetters();
    var newLetter = {
        id: makeNewId(letters),
        name: req.body.clientname,
        date: req.body.date,
        address: req.body.address,
        letter: req.body.letter
    };
    letters.push(newLetter);
    var updatedData = JSON.stringify(letters);
    fs.writeFileSync('letters.json', updatedData);
    res.redirect('/letters/new');
});

app.listen(3000, function () {
    console.log('listening on 3000');
});

//Give the user a navbar so that they can easily jump between pages