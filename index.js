 // Node server which will handle socket io connections
const io = require('socket.io')({cors:{
    origin:"*",
    
}
})
.listen(8000)

const users = {};

io.on('connection', socket => {

    // If any new user joins, let other users connected to the server know
    socket.on('new-user-joined', name => {
        //    console.log("New user", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    });

    // If someone send a message, broadcast it to other people
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });

    // If someone leaves the CharacterData, let others know 
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id]
    });

}) 
