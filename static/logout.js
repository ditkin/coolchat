document.getElementById('logout').addEventListener('click', () => {
	sendGet('/logout', handleSuccessfulLogout);
});

const handleSuccessfulLogout = () => {
	const symbol = document.getElementById('logged-in-symbol');
	symbol.parentNode.removeChild(symbol);

	setSessionLogout();
	toggleLogoutView();
}

const setSessionLogout = (name) => {
	sessionStorage.setItem('loggedIn', false);
	sessionStorage.setItem('currentUser', null);
}

const toggleLogoutView = () => {
	document.getElementById('login').style.display = null;
	document.getElementById('logged-in').style.display = 'none';
	document.getElementById('logout').style.display = 'none';
}