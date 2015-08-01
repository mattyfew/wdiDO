var express = require('express');
var fs = require('fs');
var request = require('request');
var ejs = require('ejs');
var app = express();
var bodyParser = require('body-parser');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
app.use(urlencodedBodyParser);
app.set("view_engine", "ejs");

var index = fs.readFileSync('index.html', 'utf8')

//Custom Functions
//function Letter(name,date,address,letter){
//    this.name = name;
//    this.date = date;
//    this.address = address;
//    this.letter = letter;
//    //this.id = makeNewId(letterArray);
//}

function getLetters() {
    var data = fs.readFileSync('letters.json', 'utf8');
    var letters = JSON.parse(data);
    return letters;
}

function makeNewId(array) {
    var currentId = array[array.length - 1].id;
    var newId = currentId + 1;
    return newId;
}

app.get('/letters/new', function (req, res) {
    res.send(index);
});

//app.get('/letters/new', function(req,res){
//    
//});

//app.get('/letters', function(req,res){
//    
//});

//app.get('/letters/:id', function(req,res){
//    
//});

app.get('/', function (req, res) {
    res.redirect('/letters/new')
});

app.post('/forminput', function (req, res) {
        var letters = getLetters();
        var newLetter = {
            name: req.body.clientname,
            date: req.body.date,
            address: req.body.address,
            letter: req.body.letter
        };
    letters.push(newLetter);
    console.log(letters);
    console.log("hey what up")
        //letterArray.push(letter);
    console.log(letters);
    var updatedData = JSON.stringify(letters);
    fs.writeFileSync('letters.json', updatedData);
    res.redirect('/letters/new');
});

app.listen(3000, function () {
    console.log('listening on 3000');
});


//The form should take a name, an address, a date, and a letter. Your app should be able to:
//
//Use this form to send a letter via a POST request.
//Persist each letter that gets sent in a JSON file.
//If the user navigates to /letters render a list of all of the letters' dates and recipients.
//All of the letters in the list should be rendered as links to the specific /letter/:id
//If the user navigates to /letters/:id render the individual letter with that id.
//Remember To
//
//Create a seperate EJS template for each route (/, /letters, and /letters/:id)
//Give the user a navbar so that they can easily jump between pages
