const express = require('express');
const socket = require('socket.io');

const app = express();

const port = process.env.PORT || 3001;

app.get('/', () => console.log('it works'));

const server = app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});


const io = socket(server, { pingTimeout: 60000 });


io.on('connection', (socket) => {

    console.log("Socket connection was maded!");

    socket.on('join', (data) => {
        socket.join(data.id);

    });



    socket.on("sendMessage", function (message) {
        console.log("Message received:");
        console.log(message);


        io.to(message.toId).emit("messageReceived", message);

        console.log("Message dispatched.");
    });

})

