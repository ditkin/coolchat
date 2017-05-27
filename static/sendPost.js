const sendPost = (data, endpoint, callback) => {
	fetch(endpoint, {
		headers: { 'Content-Type': 'application/json' },
		credentials: 'same-origin',
	  method: 'POST',
	  body: data,

	}).then(function(response) {
		if (response.status != 200) {
			writeMessage(response.status);
			return;
		}

		response.text().then(function(text) {
			if (callback) {
				callback(text);
			}
		});

	}).catch(function() {
		writeMessage(`error creating ${endpoint} @ ${Date.now()}`);
	});
}

const writeMessage = (msg) => {
	document.getElementById('message-log').innerHTML += `<br>${msg}`;
}