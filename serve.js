var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require("mongoose")

app.use(express.static(__dirname +'\\public'))

// console.log(__dirname+'\\index.html')

app.get('/getreq', (req, res, next) => {
    console.log(req.location)
    // res.sendFile(__dirname+'/public/signup.html');
    next()
})

const server = http.listen(5000, () => {
    console.log("server started at port ", server.address().port);
})