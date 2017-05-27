const sendGet = (endpoint, callback) => {
	fetch(endpoint, {
		credentials: 'same-origin',
		headers: { 'Content-Type': 'text/plain' },
	  method: 'GET',

	}).then(function(response) {
		if (response.status != 200) {
			writeMessage(response.status);
		}

		response.text().then(function(text) {
			if (callback) {
				callback(text);
			}
		});

	}).catch(function() {
		writeMessage("error doing ${endpoint} @ ${Date.now()}");
	});
}
