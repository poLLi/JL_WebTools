// Inside each ".js" file above, the module expects this at a bare-minimum
// An example svc:
export default function(socket, io) {
    socket.on('disconnect', () => {
        console.log('Disconnected: %s sockets still connected', io.engine.clientsCount);
    });

    return Object.freeze({
        /* Just define the methods here */
        sendMessage(msg) {
            console.log(msg);
            socket.broadcast.emit('new-message', msg);
        },

        disconnect() {
            console.log('Disconnected: %s sockets still connected', io.engine.clientsCount);
        }
    });
}

/*import http from 'http';
import socketIO from 'socket.io';

var connectedCount = 0;

export default function() {
    this.nuxt.hook('render:before', renderer => {
        const server = http.createServer(this.nuxt.renderer.app);
        const io = socketIO(server);

        // overwrite nuxt.server.listen()
        this.nuxt.server.listen = (port, host) =>
            new Promise(resolve => server.listen(port || 3000, host || 'localhost', resolve));
        // close this server on 'close' event
        this.nuxt.hook('close', () => new Promise(server.close));

        // Add socket.io events
        const messages = [];
        io.on('connection', socket => {
            connectedCount++;
            console.log('Connected: %s sockets connected', io.engine.clientsCount);

            socket.on('disconnect', () => {
                connectedCount--;
                console.log('Disconnected: %s sockets still connected', io.engine.clientsCount);
            });

            socket.on('last-messages', function(fn) {
                fn(messages.slice(-50));
            });
            socket.on('send-message', function(message) {
                messages.push(message);
                socket.broadcast.emit('new-message', message);
            });
        });
    });
}
*/
