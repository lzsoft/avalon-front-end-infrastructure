const fs = require ? require('fs') : null;
window.HTMLScriptElement.prototype.loadSameNameHTML = function (callback) {
    if (fs) {
        // means we're in Electron/Nodejs
        fs.readFile(document.currentScript.src.substr(0, document.currentScript.src.length - 3) + '.html', function read(err, data) {
            if (err) {
                throw err;
            }
            callback(data);
        });
    } else {
        fetch(document.currentScript.src.substr(0, document.currentScript.src.length - 3) + '.html').then(function (response) {
            response.text().then(function (result) {
                callback(result);
            }, function (err) {
                throw err;
            });
        }, function (err) {
            throw err;
        });
    }
};