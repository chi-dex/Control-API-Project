const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const server = express();

//getting control routes
const controlRoutes = require("./routes/control");

//for development
server.use(morgan("dev"));

server.use(cors())
server.use(bodyParser.json());

//route
server.use("/api", controlRoutes)


//=====PORT
const PORT = process.env.PORT || 8080;

//connect to DB and start server
mongoose.connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(res => {
        server.listen(PORT, () => console.log("server running... and db connected..."))
    })
    .catch(err => {
        console.log("error connecting to database");
    })
