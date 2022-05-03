var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require("mongoose")

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const dbUrl = 'mongodb+srv://Codad5:PR2FhMRMHdsfcqRF@cluster0.ipsst.mongodb.net/Cluster0?retryWrites=true&w=majority';

var message = [
    { name: "Me", message: "This is me " }, 
    { name: "Me", message: "This is me now" }
]
app.get('/message', (req, res) => {
    res.send(message)
})

app.post('/message', (req, res) => {
    if (req.body.name.length > 0 && req.body.message.length > 0) {

        message.push(req.body)
    }
    res.sendStatus(200)
    io.emit('message', req.body)
})
io.on('connection', (socket) =>{
    console.log("socket connection established")
})

mongoose.connect(dbUrl, (err) => {
    console.log(err)
})
var server = http.listen(5000, () => {
    console.log("server is listening on port", server.address().port)
})

