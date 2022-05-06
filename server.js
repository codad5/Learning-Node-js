var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require("mongoose")
// const [db] = require('db.js')

// console.log(db);


app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const dbUrl = 'mongodb://<username>:<password>@learningnode-shard-00-00.ipsst.mongodb.net:27017,learningnode-shard-00-01.ipsst.mongodb.net:27017,learningnode-shard-00-02.ipsst.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-twcbwj-shard-0&authSource=admin&retryWrites=true&w=majority';

var message = [
    { name: "Me", message: "This is me " },
    { name: "Me", message: "This is me now" }
]
app.get('/message', (req, res) => {
    res.send(message)
})

app.get('/style', (req, res) => {

    res.sendFile(__dirname + '/assets/style/index.css');
})
app.get('/app', (req, res) => {

    res.sendFile(__dirname + '/app.html');
})


app.post('/message', (req, res) => {
    if (req.body.name.length > 0 && req.body.message.length > 0) {

        message.push(req.body)
    }
    res.sendStatus(200)
    io.emit('message', req.body)
})
io.on('connection', (socket) => {
    console.log("socket connection established")
})

// app.get('/user',(req, res) => {

// })

mongoose.connect(dbUrl, (err) => {
    console.log('MongoDb err', err)
})
var server = http.listen(5000, () => {
    console.log("server is listening on port", server.address().port)
})

const userRoute = require('./routes/user.js')
const productRoute = require('./routes/product.js')
const { setInterval } = require('timers/promises')

// app.get('user', (req, res)  => {
//     console.log('This is working')
//     res.send('This is working')
// })
app.use('/user', userRoute)
app.use('/product', productRoute)
// app.post('/user', userRoute)

