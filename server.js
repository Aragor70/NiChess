const express = require('express');
const connect = require('./config/connect');


const app = express();

connect()
app.use(express.json())



const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`Server is running on port: ${PORT}.`));


process.on('unhandledRejection', (err, _promise) => {
    console.error(`Error message: ${err.message}`)
    server.close(() => process.exit(1))
})