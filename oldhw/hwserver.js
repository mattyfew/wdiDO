//NOTE*********NEED TO ADD TO DIANA STUDENTS HOMEWORK LATER

//Implement a server which will:
//Broadcast incoming messages to each connected client
//support multiple clients
//handles client disconnect (i.e. does not send messages to disconnected clients)
//keep a history of chat messages and broadcast the history to new clients when they connect

var net = require('net');
var port = 3000;
var chalk = require('chalk');
var clients = [];

var server = net.createServer(function (socket) {
    if (this.createServer = true) {
        console.log('client connected');
        //console.log('Number of clients in the chat: ', counter);

        //Identifies client, gives him a name of IP ADDRESS:PORT
        socket.name = socket.remoteAddress + ":" + socket.remotePort;
        clients.push(socket);
    };

    //  Welcome Message to socket
    socket.write('Welcome to the MF Chat Room!\r\n');
    //  Broadcast to chat
    broadcast(socket.name + " joined the chat\n", socket);

    socket.on('data', function (data) {
        broadcast(chalk.red(socket.name) + ": " + data, socket);
    });

    // Remove the client from the list when it leaves
    socket.on('end', function () {
        clients.splice(clients.indexOf(socket), 1);
        broadcast(socket.name + " left the chat.\n");
    });

    // Send a message to all clients
    function broadcast(message, sender) {
        clients.forEach(function (client) {
            // Don't want to send it to sender
            if (client === sender) return;
            client.write(message);
        });
        // Log it to the server output too
        process.stdout.write(message)
    }
});

server.listen(port, function () {
    console.log('listening on ' + port);
});
