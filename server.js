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

const dbUrl = 'mongodb://127.0.0.1:27017/cooker';
// const dbUrl = 'mongodb+srv://user:user@learningnode.ipsst.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
let Messagemodel = mongoose.model("message", {
    name:String, 
    message:String
});
mongoose.connect(dbUrl, (err) => {
    console.log('MongoDb err', err)
})


app.get('/message', (req, res) => {
    Messagemodel.find({}, (err, messages) => {
        if(err) res.status(500)
        res.send(messages)
    })
    // res.send(message)
})

app.get('/style', (req, res) => {

    res.sendFile(__dirname + '/assets/style/index.css');
})
app.get('/app', (req, res) => {

    res.sendFile(__dirname + '/app.html');
})


app.post('/message', (req, res, next) => {   
if (req.body.name.length > 0 && req.body.message.length > 0) {
    let messaged = new Messagemodel(req.body)
    messaged.save((err) => {
        console.log(err)
        if(err){
            res.status(500)
            next()
        }

            // message.push(req.body)
            res.sendStatus(200)
            io.emit('message', req.body)
        })
    }
    else[
        res.status(500)
    ]
    
})
io.on('connection', (socket) => {
    console.log("socket connection established")
})

// app.get('/user',(req, res) => {

// })


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

