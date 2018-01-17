{
    const fs = this.require ? require('fs') : null;
    const URL = this.require ? require('url').URL : null;
    window.HTMLScriptElement.prototype.loadSameNameHTML = function (callback) {
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
            fetch(u).then(function (response) {
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
}