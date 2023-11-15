require("dotenv").config();
const express = require('express');
const connectDB = require('./mongodb/dbConnect');


const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use((req, res, next) => {
    console.log(req.path + " " + req.method);
    next();
})

// routes

// try {
//     const port = process.env.PORT || 3001;
//     mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//          app.listen(port, (error) => {
//              console.log(error);
//              console.log('db connected & listening on port: ' + port );
//          })
//     })
//  } catch (error) {
//      console.log(error);
//  }

// database connection && starting the server
const startServer = async () => {
    try {
        const port = process.env.PORT || 3001;

        connectDB(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

        app.listen(port, () =>{
            console.log("Server started on port: " + port);
        })
        
    } catch (error) {
        console.log(error)
    }

}
startServer();