document.getElementById('login').addEventListener('click', () => {
	document.getElementById('login-form').style.display = null;
});


document.getElementById('login-form').addEventListener('submit', (e) => {
	e.preventDefault();
	e.currentTarget.style.display = 'none';

	const user = e.currentTarget.getElementsByTagName('input')[0].value;
	const pass = e.currentTarget.getElementsByTagName('input')[1].value;
	const userData = { user, pass };
	const postData = JSON.stringify(userData);
	
	sendPost(postData, '/login', handleSuccessfulLogin);
});

const handleSuccessfulLogin = (name) => {
	const user = document.createElement('button');

	user.id = 'logged-in-symbol';
	user.innerHTML = `hi ${name}`;

	document.getElementById('logged-in').appendChild(user);

	setSessionLogin(name);
	toggleLoginView();
	toggleSocketConnection();
}

const setSessionLogin = (name) => {
	sessionStorage.setItem('loggedIn', true);
	sessionStorage.setItem('currentUser', name);
}

const toggleLoginView = () => {
	document.getElementById('login').style.display = 'none';
	document.getElementById('logged-in').style.display = null;
	document.getElementById('logout').style.display = null;
}