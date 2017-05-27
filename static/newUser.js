document.getElementById('new-user').addEventListener('click', () => {
	document.getElementById('new-user-form').style.display = null;
});


document.getElementById('new-user-form').addEventListener('submit', (e) => {
	e.preventDefault();
	e.currentTarget.style.display = 'none';

	const user = e.currentTarget.getElementsByTagName('input')[0].value;
	const pass = e.currentTarget.getElementsByTagName('input')[1].value;
	const userData = { user, pass };
	const postData = JSON.stringify(userData);
	
	sendPost(postData, '/new-user');
});