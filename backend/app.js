let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
let uniqid = require('uniqid');

rooms = [];

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

// -------------------------
//* Socket IO Stuff
// -------------------------
io.on('connection', (socket) => {
    console.log('Connected: %s sockets conncted', io.engine.clientsCount);

    socket.on('disconnect', (data) => {

        // User Room count on disconnect
        if (socket.roomid) {
            if (io.sockets.adapter.rooms[socket.roomid]) {
                io.in(socket.roomid).emit('userCount', io.sockets.adapter.rooms[socket.roomid].length);
            }
        }

        console.log('Disconnecte: %s sockets still connected', io.engine.clientsCount);
    });

    // -------------------------------------------------------
    // Party create
    socket.on('createParty', () => {
        let id = uniqid();

        // join room with uniq ID
        socket.join(id);

        // Set Room Data once on room creation
        io.sockets.adapter.rooms[id].id = id;
        io.sockets.adapter.rooms[id].currVideo = 'Dqb2KY6F4iw';
        io.sockets.adapter.rooms[id].currPlayer = 'yt';
        io.sockets.adapter.rooms[id].time = '0';

        // add room to global array
        console.log(io.sockets.adapter.rooms[id].id);
        rooms.push(io.sockets.adapter.rooms[id].id);

        // emit room id back to client
        socket.emit('partyCreated', id);
        console.log('Party created: ' + id);
    });

    // -------------------------------------------------------
    // Party join
    socket.on('joinParty', (id, username) => {

        // Check if room exists
        if (io.sockets.adapter.rooms[id] === undefined) {
            console.log('Party dont Exsits');
            return socket.emit('partyDontExists');

        } else {

            // join room with ID
            socket.join(id);
            socket.roomid = id;

            // set username if given - else set uniqid
            if (username) {
                socket.username = username;
            } else {
                socket.username = 'User-' + uniqid.time();
            }

            // Sync all room data
            io.in(id).emit('syncPartyData',
                io.sockets.adapter.rooms[id].currVideo,
                io.sockets.adapter.rooms[id].currPlayer,
                io.sockets.adapter.rooms[id].time
            );

            // emit to user counter
            io.in(id).emit('userCount', io.sockets.adapter.rooms[id].length);
            console.log('Party joined: ' + id);
        }


    });

    // -------------------------------------------------------
    // Party Sync

    socket.on('syncCurrentTime', (id, currTime) => {
        if (io.sockets.adapter.rooms[id] !== undefined) {
            io.sockets.adapter.rooms[id].time = currTime;
        }
    })

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