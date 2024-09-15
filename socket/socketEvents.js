module.exports = (socket, io) => {
	socket.on('sendMessage', (message) => {
		console.log(message)
		io.emit(message)
	})
}
