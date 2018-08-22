window.HTMLScriptElement.prototype.loadSameNameHTML = function(callback) {
	const fs = this.require ? require('fs') : null;
	const URL = this.require ? require('url').URL : null;
	let u = document.currentScript.src.substr(0, document.currentScript.src.lastIndexOf('.')) + '.html';
	if (fs) {
		// means we're in Electron/Nodejs
		u = new URL(decodeURI(u));
		fs.readFile(u, function read(err, data) {
			if (err) {
				throw err;
			}
			callback(data);
		});
	} else {
		fetch(u).then(function(response) {
			response.text().then(function(result) {
				callback(result);
			}, function(err) {
				throw err;
			});
		}, function(err) {
			throw err;
		});
	}
};
window.Math.randomRange = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
window.Number.prototype.toRad = function() {
	return this * Math.PI / 180;
};
window.Math.calculateDistance = function(lat1, lon1, lat2, lon2) {
	let R = 6371;
	let dLat = (lat2 - lat1).toRad();
	let dLon = (lon2 - lon1).toRad();
	let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	let d = R * c;
	return d;
};
window.location.staticAssign = function(val) {
	window.history.pushState(null, null, val);
	window.dispatchEvent(new Event("popstate"));
};