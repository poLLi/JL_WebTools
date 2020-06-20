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
        if (socket.roomId) {
            if (io.sockets.adapter.rooms[socket.roomId]) {
                io.in(socket.roomId).emit('userCount', io.sockets.adapter.rooms[socket.roomId].length);
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

        // set roomId and host
        io.sockets.adapter.rooms[id].id = id;
        io.sockets.adapter.rooms[id].host = socket.id;

        // Set Room Data once on room creation with default Placeholder Video
        io.sockets.adapter.rooms[id].currPlayer = 'yt';

        io.sockets.adapter.rooms[id].currVideo = {
            id: 'ScMzIvxBSi4',
            length: '94.301',
            currTime: '0.000'
        };

        io.sockets.adapter.rooms[id].prevVideo = {
            id: 'prevVideoID',
            length: 'prevVideoLength',
        };

        io.sockets.adapter.rooms[id].queue = {
            yt: [{
                videoId: 'queueID',
                title: 'sadasda'
            }]
        };

        // add room to global array
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

            return socket.emit('partyDontExists');

        } else {

            // join room with ID and set roomId on Socket
            socket.join(id);
            socket.roomId = id;

            // set username if given - else set uniqid
            if (username) {
                socket.username = username;
            } else {
                socket.username = 'User-' + uniqid.time();
            }

            // Sync initial all room data
            io.in(id).emit('syncInitPartyData',
                io.sockets.adapter.rooms[id]
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
            io.sockets.adapter.rooms[id].currTime = currTime;
        }
    })

    // -------------------------------------------------------
    // Party Chat
    socket.on('sendMessage', (id, message) => {
        io.in(id).emit('messageRecived', socket.username, message);
    });
});

// Server port listening
http.listen(3002, () => {
    console.log('listening on *:3002');
});