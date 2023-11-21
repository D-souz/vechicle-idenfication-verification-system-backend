const mongoose = require('mongoose');

// mongodb+srv://blog123:blog123@cluster0.x6chg7g.mongodb.net/qrcode?retryWrites=true&w=majority

const connectDB = (url) => {
    mongoose.connect(url)
    .then(() => console.log("Database connected!"))
    .catch((error) => console.log(error))
}

module.exports = connectDB;