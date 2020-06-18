var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var uniqid = require('uniqid');

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    console.log('Connected: %s sockets conncted', io.engine.clientsCount);



    socket.on('disconnect', () => {
        console.log('Disconnecte: %s sockets still connected', io.engine.clientsCount);
    });

    socket.on('sendMessage', (id, message) => {
        io.in(id).emit('messageRecived', message);
    });

    socket.on('createParty', name => {
        var id = uniqid();
        socket.join(id);
        socket.emit('createdParty', id);
        console.log('Party created: ' + id);
    });

    socket.on('joinParty', id => {
        socket.join(id);
        console.log('Party joined: ' + id);
    });
});

http.listen(3002, () => {
    console.log('listening on *:3002');
});