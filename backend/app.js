let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
let uniqid = require('uniqid');

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

// -------------------------
//* Socket IO Stuff
// -------------------------
io.on('connection', (socket) => {
    console.log('Connected: %s sockets conncted', io.engine.clientsCount);

    socket.on('disconnect', () => {
        console.log('Disconnecte: %s sockets still connected', io.engine.clientsCount);
    });

    // -------------------------------------------------------
    // Party creation & joining
    socket.on('createParty', () => {
        let id = uniqid();

        socket.emit('partyCreated', id);
        console.log('Party created: ' + id);
    });

    socket.on('joinParty', id => {
        socket.join(id);
        console.log('Party joined: ' + id);
    });

    // -------------------------------------------------------
    // Party Chat
    socket.on('sendMessage', (id, message) => {
        io.in(id).emit('messageRecived', message);
    });
});

// Server port listening
http.listen(3002, () => {
    console.log('listening on *:3002');
});