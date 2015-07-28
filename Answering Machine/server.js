var fs = require('fs');
var ejs = require('ejs');
var net = require('net');
var port = 3000;
var jsonArray = [];
var jsonFile = JSON.stringify(fs.readFileSync('messages.json', 'utf8'));


//A user should be able to leave a message. 
//A user should also be able to read all messages. 
//A user should be able to delete all messages, or delete an individual message. 
//This means each message should be stored with an id, ideally a numeric one.

var server = net.createServer(function (client) {
    client.write('Hello Client\r\n');
    client.write('Please enter a command: showMessages, leaveMessage, deleteMessage, or deleteAll\r\n');

    //Message Constructor
    var Message = function (name, message) {
        this.name = name;
        this.id = JSON.stringify(jsonArray.length);
        this.message = message;
    };

    //----> Data Event
    client.on('data', function (data) {
        data = data.toString().trim();
        //var messages = JSON.parse(fs.readFile('data.json', 'utf8'));
        if (data === 'showMessages') {
            if (jsonArray.length === 0) {
                client.write("There are no messages to display!");
            } else {
                for (var i = 0; i < jsonFile.length; i++) {
                    client.write("ID: " + JSON.stringify(jsonFile[i].id) + "\r\n");
                    client.write("NAME: " + JSON.stringify(jsonFile[i].name) + "\r\n");
                    client.write("MESSAGE: " + JSON.stringify(jsonFile[i].message) + "\r\n");
                    client.write("--------------------" + "\r\n");
                }
            }
        } else if (data === 'leaveMessage') {
            //-----> Leave Message
            //----->Get Name
            client.write('Please type your name:');
            client.on('data', function (userInput) {
                newUserInput = userInput.toString().trim();
                var newMessage = new Message(newUserInput, null);
                client.write('Please write out your message below:');
            });
            client.on('data', function (userInput) {
                newUserInput = userInput.toString().trim();
                newMessage.message = newUserInput;
                var jsonMessage = JSON.stringify(newMessage);
                jsonArray.push(jsonMessage);
            });
            //------->WRITE FILE
            fs.writeFile('messages.json', jsonArray, function (err) {
                if (err) {
                    throw err;
                } else {
                    console.log("it actually worked. high-five!");
                    client.write("Thank you for your message, I will get back to you soon")
                };
            });
        } else if (data === 'deleteMessage') {
            client.write('Deleting Message!');
        } else if (data === 'deleteAll') {
            client.write('Deleting all messages!')
        }
    });
});

//----> END Event
server.on('end', function () {
    console.log('client disconnected');
});

server.listen(port, function () {
    console.log('listening on ' + port);
});
