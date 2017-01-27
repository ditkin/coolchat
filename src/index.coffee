# the server
http = require 'http'
fs = require 'fs'
pry = require 'pryjs'

server = http.createServer (req, res) ->
  file = fs.readFile 'src/client/ui.html', (err, data) ->
    console.log data
    res.writeHead 200, 'Content-Type': 'text/html'
    res.write '<title>Hello World Page</title>'
    res.write data
    res.end

server.listen 1234, () ->
  console.log "#{new Date} Server is listening on port 1234"

# websockets
ws = require('websocket').server
ws_serv = new ws httpServer: server

count = 0
clients = {}

# listening
ws_serv.on 'request', (r) ->
  conn = r.accept 'echo-protocol', r.origin
  id = count++
  clients[id] = conn
  console.log "#{new Date} Connection accepted [#{id}]"

  # event listener on message from client
  conn.on 'message', (message) =>
    console.log message
    msg = message.utf8Data
    clients[0].sendUTF msg

  # event listener on client DC
  conn.on 'close', (reason, desc) =>
    delete clients[id]
    console.log '#{new Date} Peer #{conn.remoteAddress} disconnected'


