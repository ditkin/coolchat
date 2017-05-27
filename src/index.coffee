# requires
express = require 'express'
mongo = require 'mongodb'
utils = require './helpers/http_utils'
web_socket = require './web_socket'

body_parser = require 'body-parser'
cookie_parser = require 'cookie-parser'
session = require 'express-session'
connect_mongo = require 'connect-mongo'
Mongo_store = connect_mongo session

ws_dep = require 'ws'
ws = new ws_dep.Server
  port: 2345
  perfMessageDeflate: false

pry = require 'pryjs'

app = express()


# Setup middleware
json_parser = body_parser.json()

auth = (req, res, next) =>
  console.log "AUTH SESSION %j", req.session
  if req.session and req.session.user
    next()
  else
    res.sendStatus 401

ws.broadcast = (data) =>
  ws.clients.forEach (client) =>
    console.log "broadcasting to client: %j", client
    if client.readyState is ws_dep.OPEN
      client.send data

ws.room_cast = (db, room) =>
  talkers = db.collection 'talkers'
  all_talkers = talkers.find()
  eval pry.it

  ws.clients.forEach (client) =>
    unique_id = client.upgradeReq.headers['sec-websocket-key']
    talker = all_talkers.unique_id

update_talker = (db, talker, room) =>
  talkers = db.collection 'talkers'
  doc = name: talker
  doc.room = room if room
  talkers.update doc, doc, upsert: true

mongo_client = mongo.MongoClient;
mongo_client.connect 'mongodb://localhost:27017/app', (err, db) ->
  store = new Mongo_store
    db: db

  session_params =
    resave: true
    secret: 'majamcjaja'
    saveUninitialized: false
    store: store
    cookie:
      httpOnly: false
      maxAge: 900000000
      secure: false

  # Define middleware
  app.use session(session_params)
  app.use express.static('static')

  app.post '/new-user', json_parser, (req, res) ->
    utils.handle_new_user req, res, db

  app.post '/new-room', auth, json_parser, (req, res) ->

    utils.handle_new_room req, res, db

  app.post '/login', json_parser, (req, res) ->
    utils.handle_login req, res, db

  app.get '/logout', auth, (req, res) ->
    utils.handle_logout req, res, db
 
  ws.on 'connection', (socket) =>
    update_talker db, socket.upgradeReq.headers['sec-websocket-key']

    socket.on 'message', (msg) =>
      data = JSON.parse msg
      if data.join_req
        update_talker db, socket.upgradeReq.headers['sec-websocket-key'],
          data.join_req
        message = JSON.stringify join: data.join_req
        socket.send message

      if data.room_msg
        ws.room_cast db, data.room, data.room_msg
      socket.send "Welcome #{data.user}"

  setInterval () =>
    rooms = db.collection 'rooms'
    rooms.find().toArray (err, coll) =>
      msg = JSON.stringify rooms: coll
      ws.broadcast msg
  , 5000

  app.listen 1234, () ->
    console.log "#{new Date} Server is listening on port 1234"


