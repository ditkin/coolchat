pry = require 'pryjs'

exports.respond = (data, res, db, post_header) ->
	json_data = JSON.parse data
	room_name = json_data.name

	res.writeHead post_header
	res.end room_name
