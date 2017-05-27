const toggleSocketConnection = () => {
	window.ws = new WebSocket('ws://127.0.0.1:2345/');

	ws.onopen = () => {
	  // Web Socket is connected, send data using send()
	  const initialData = {
	  	user: sessionStorage.currentUser,
	  	message: 'joined'
	  }
	  ws.send(JSON.stringify(initialData));
	};

	ws.onmessage = (evt) => {
		const msg = JSON.parse(evt.data);
		if (msg.rooms) {
			parseRooms(msg.rooms);
		}
		if (msg.join) {
			handleRoomJoin(msg.join);
		}
	};

	ws.onclose = () => {
	  // websocket is closed.
	  alert("Connection is closed..."); 
	};
}