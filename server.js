require('dotenv').config({ path: './config/config.env' })
const express = require('express');
const connect = require('./config/connect');
const errorHandler = require('./middlewares/error');
const socketio = require('socket.io');
const http = require('http');

const app = express();

connect()

app.use(express.json())

const server = http.createServer(app)
const io = socketio(server)

let clients = [];

io.on('connection', (socket) => {

    socket.on('join', () => {

        socket.join()
            console.log('joined')

        socket.on('disconnect', () => {
            console.log('logged out')
            
        });
    })

})

app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/tables', require('./routes/api/tables'))
app.use('/api/games', require('./routes/api/games'))

app.use(errorHandler)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}.`));


process.on('unhandledRejection', (err, _promise) => {
    console.error(`Error message: ${err.message}`)
    server.close(() => process.exit(1))
})