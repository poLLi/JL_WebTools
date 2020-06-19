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

        /*
    io.sockets.adapter.rooms[id].currVideo = 'Dqb2KY6F4iw';
    io.sockets.adapter.rooms[id].currPlayer = '';
    io.sockets.adapter.rooms[id].lenght = '';
    io.sockets.adapter.rooms[id].time = '';


    console.log('Party created: ' + id);
*/

        socket.emit('partyCreated', id);
        console.log('Party created: ' + id);
    });

    socket.on('joinParty', id => {

        // Check if room exists
        /*if (io.sockets.adapter.rooms[id] === undefined) {
            console.log('Party dont Exsits');
            return socket.emit('partyDontExists');

        } else {*/
        console.log('Party joined: ' + id);
        socket.join(id);
        socket.username = 'test - ' + socket.id;

        // TODO: Sync all room data
        //}


    });

    // -------------------------------------------------------
    // Party Chat
    socket.on('sendMessage', (id, message) => {
        io.in(id).emit('messageRecived', socket.username + ': ' + message);
    });
});

// Server port listening
http.listen(3002, () => {
    console.log('listening on *:3002');
});