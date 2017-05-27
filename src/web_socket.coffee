# websockets
count = 0
clients = {}
rooms = []

# listening
exports.socket_communications = (r) ->
  conn = r.accept 'echo-protocol', r.origin
  id = count++
  clients[id] = conn
  console.log "#{new Date} Connection accepted [#{id}]"

  # server push current state.
  interval = setInterval () =>
    clients[id].sendUTF
  , 5000

  # event listener on message from client
  conn.on 'message', (message) =>
    eval pry.it
    message_json = JSON.parse message.utf8Data
    rooms.push
      name: message_json.room,
      creator_id: id

    clients[id].sendUTF JSON.stringify(rooms)

  # event listener on client DC
  conn.on 'close', (reason, desc) =>
    delete clients[id]
    rooms.filter (room) ->
      unless room.creator_id is id
        room
    console.log '#{new Date} Peer #{conn.remoteAddress} disconnected'
