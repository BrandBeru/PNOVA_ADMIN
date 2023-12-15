"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
function chatSocket(server) {
    const io = new socket_io_1.Server(server);
    io.on('connection', (socket) => {
        console.log('user connected');
        socket.on('message', (msg) => {
            console.log('socket message: ', msg);
            io.emit('chat message', "*" + msg);
        });
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
    io.sockets.on('connection', function (socket) {
        console.log('con: ', socket.request.session.user_id);
    });
}
exports.default = chatSocket;
