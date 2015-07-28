//Create an application that mimics a magic eight ball. Regardless of the question, the program will respond with a random prediction. Deploy the App to Digital Ocean and test it.

var net = require('net');
var port = 3000;
var counter = 0;

var fortunes = [
    "Ask again later",
    "You will be eaten by an alligator",
    "Tyranosaurus Rex",
    "You will make a lot of money",
    "Programming will come easy for you",
    "You will be a programming master",
    "Stay Zen"
];
    

var server = net.createServer(function(c) {
    if (this.createServer = true) {
        console.log('client connected');
        counter++;
        console.log('Number of clients: ', counter);
    };

    c.write('Hello! This is the Magic 8-Ball Server!\r\nPlease ask a question and I will predict your future\r\n');       
    
    c.on('data', function (data) {
        //var input = data.toString().trim();
        var yourFortune = fortunes[(Math.floor(Math.random() * fortunes.length))];
        c.write(yourFortune.toString() + "/r/n");
    });

    c.on('end', function() {
        console.log('client disconnected');
        counter--;
    });
});

server.listen(port, function() {
    console.log('listening on ' + port);
});
