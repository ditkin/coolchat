path = require 'path'
body_parser = require 'body-parser'

pry = require 'pryjs'

# GET
get_header =
  'Content-Type': 'text/html'

# POST
post_header =
  'Content-Type': 'text/plain'

exports.respond_post = (res, data) ->
  res.writeHead 200, post_header
  res.end data

exports.handle_new_room = (req, res, db) ->
  doc = name: req.body.name, owner: req.body.user

  rooms = db.collection 'rooms'
  rooms.update doc, doc, upsert: true

  exports.respond_post res, doc.name

exports.handle_new_user = (req, res, db) ->
  doc = user: req.body.user, pass: req.body.pass

  users = db.collection 'users'
  users.update doc, doc, upsert: true

  exports.respond_post res, doc.user

# LOGIN LOGIC
exports.handle_login = (req, res, db) ->
  doc = user: req.body.user, pass: req.body.pass
  unless doc.user and doc.pass
    res.sendStatus 401
  else
    _lookup_login_info req, res, db, doc
  
_lookup_login_info = (req, res, db, doc) ->
  users = db.collection 'users'
  users.findOne doc, (err, item) =>
    unless item
      res.sendStatus 401
    else
      req.session.user = item.user
      res.send item.user

# LOGOUT
exports.handle_logout = (req, res) =>
  req.session.destroy()
  res.send 'logout success'




