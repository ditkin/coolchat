
const parseRooms = (roomData) => {
	const roomsView = document.getElementById('existing-rooms');
	roomData.forEach((room) => {
		const roomId = `room-${room.name}`;
		if (!roomsView.querySelector(`#${roomId}`)) {
			const newRoom = document.createElement('button');
			newRoom.id = roomId;
			newRoom.innerHTML = room.name;
			newRoom.addEventListener('click', joinRoom);

			roomsView.appendChild(newRoom);
		}
	});
}

const joinRoom = (e) => {
	const roomName = e.currentTarget.innerHTML;
	const joinData = {
  	join_req: roomName,
  }
  ws.send(JSON.stringify(joinData));
}

const handleRoomJoin = (room) => {
	const currentRoom = createCurrentRoomElement(room);

	const roomTypeBar = document.createElement('input');

	document.getElementById('talk-block').appendChild(currentRoom);
}

const createCurrentRoomElement = (room) => {
	const currentRoom = document.createElement('div');
	currentRoom.id = `in-${room}`;
	currentRoom.innerHTML = `Chatting: ${room}`;
	currentRoom.style.display = 'table-cell';
	currentRoom.style.verticalAlign = 'bottom';
	currentRoom.style.background = 'lightgrey';
	currentRoom.style.width = '200px';
	currentRoom.style.height = '250px';
	currentRoom.style.margin = '10px 3px 10px 3px';
	currentRoom.style.border = '1px solid black';
	const text = 'ff<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>dfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffffffdfffffffff';
	currentRoom.appendChild(createTextHistoryField(text));
	currentRoom.appendChild(createCurrentRoomTypeBar());
	return currentRoom;
}

const createTextHistoryField = (text) => {
	const div = document.createElement('div');
	div.style.height = '200px';
	div.style.width = '200px';
	div.style.display = 'inline-block';
	div.style.overflowY = 'auto';
	div.innerHTML = text;
	return div;
}

const createCurrentRoomTypeBar = (room) => {
	const input = document.createElement('input');
	input.style.width = '200px';
	input.style.display = 'inline-block';
	input.style.margin = 'auto';
	input.placeholder = 'type message to send';
	return input;
}