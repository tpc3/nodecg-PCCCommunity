const clock = e => {
	const chk = i => {
		if (i < 10) {
			return '0' + i;
		}

		return i;
	};

	const time = new Date();
	e.innerText = chk(time.getHours()) + ':' + chk(time.getMinutes()) + ':' + chk(time.getSeconds());
};

const getJSON = function (url, callback) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = 'json';
	xhr.onload = function () {
		const {status} = xhr;
		if (status === 200) {
			callback(xhr.response);
		} else {
			console.log('Error while GETting json, ' + String(status));
			callback(null);
		}
	};

	xhr.send();
};
