const createRoomElement = (name) => {
	const room = document.createElement('button');

	room.id = `room-${name}`;
	room.innerHTML = name;

	document.getElementById('existing-rooms').appendChild(room);
}


document.getElementById('new-room').addEventListener('click', () => {
	document.getElementById('new-room-form').style.display = null;
});


document.getElementById('new-room-form').addEventListener('submit', (e) => {
	e.preventDefault();
	e.currentTarget.style.display = 'none';

	const enteredValue = e.currentTarget.getElementsByTagName('input')[0].value;
	const roomData = { name: enteredValue };
	const postData = JSON.stringify(roomData);
	
	sendPost(postData, '/new-room', createRoomElement);
});