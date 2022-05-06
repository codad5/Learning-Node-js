var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require("mongoose")

app.use(express.static('index.html'))

console.log(__dirname)