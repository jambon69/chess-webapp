const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app, {});
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
	origin: "http://localhost:4200",
	methods: ["GET", "POST"]
    }
});

// Middleware that attaches username to every socket session
io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    const color = socket.handshake.auth.color;
    if (!username || !color) {
	return next(new Error("invalid username or color"));
    }
    socket.username = username;
    socket.color = color;
    next();
});

const {
    listGames,
    addGame,
    joinGame
} = require("./src/gameHandler")(io);

const onConnection = (socket) => {
    socket.on("game:list", listGames);
    socket.on("game:add", addGames);
    socket.on("game:join", joinGame);
}

io.on("connection", onConnection);

//socket.broadcast.emit("user connected", ...) will emit to all connected clients, except the socket itself.

// io.on('connection', (socket) => {
//     console.log("a user connected");

//     // When connecting, we sennd all users already connected to the socket
//     const users = [];
//     // Map of all currently connected Socket instances
//     for (let [id, socket] of io.of("/").sockets) {
// 	users.push({
// 	    id: id,
// 	    username: socket.username,
// 	    color: socket.color
// 	});
//     }
//     socket.emit("users", users);

//     socket.on('disconnect', () => {
// 	console.log('user disconnected');
//     });
//     socket.on('new-user', (user) => {
// 	console.log(user);
//     });
//     socket.send("connected");
// });

// io.on('new-user', (arg, callback) => {
//     console.log(arg);
// })

server.listen(3000, () => {
    console.log('listening on *:3000');
});
