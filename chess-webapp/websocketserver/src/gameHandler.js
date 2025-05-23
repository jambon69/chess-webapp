    // // When connecting, we sennd all users already connected to the socket
    // const users = [];
    // // Map of all currently connected Socket instances
    // for (let [id, socket] of io.of("/").sockets) {
    // 	users.push({
    // 	    id: id,
    // 	    username: socket.username,
    // 	    color: socket.color
    // 	});
    // }
    // socket.emit("users", users);
module.exports = (io) => {
    const listGames = function() {
	const socket = this
    };
    const addGame = function(payload) {
    };
    const joinGame = function(payload) {
    };

    return {
	listGames,
	addGame,
	joinGame
    }
}
