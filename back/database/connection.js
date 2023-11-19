const mongoose = require("mongoose");
var url="mongodb://0.0.0.0:27017/logs"

mongoose.connect(url)

var connection = mongoose.connection
connection.on('error',()=>{
    console.log("Connection Error occured");
})
connection.on('connected',()=>{
    console.log("Connection successful");
})