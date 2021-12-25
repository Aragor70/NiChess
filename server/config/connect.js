const mongoose = require('mongoose');




module.exports = async() => {

    try {

        const connect = await mongoose.connect(process.env.db_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected...')
        console.log(connect.connection.host)

    } catch (err) {
        
        console.error(err)
        process.exit(1)

    }
    
}