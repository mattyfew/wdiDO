//NOTE*********NEED TO ADD TO DIANA STUDENTS HOMEWORK LATER

//Implement a server which will:
//Broadcast incoming messages to each connected client
//support multiple clients
//handles client disconnect (i.e. does not send messages to disconnected clients)
//keep a history of chat messages and broadcast the history to new clients when they connect

var net = require('net');
var port = 3000;
var counter = 0;
var clients = [];

var server = net.createServer(function(c) {
    if (this.createServer = true) {
        console.log('client connected');
        counter++;
        console.log('Number of clients in the chat: ', counter);
        
        //Identifies client, gives him a name of IP ADDRESS:PORT
        c.ip = socket.remoteAddress + ":" + socket.remotePort;
        clients.push(c);
        
    };

    c.write('Hello!', socket.name, 'Welcome to the MF Chat Room!\r\n');       

    c.on('data', function (data) {
        var input = data.toString().trim();
        c.write( + "/r/n");
    });

    c.on('end', function() {
        console.log('client disconnected');
        counter--;
    });
});

server.listen(port, function() {
    console.log('listening on ' + port);
});
