window.HTMLScriptElement.prototype.loadSameNameHTML = function(callback) {
    fetch(document.currentScript.src.substr(0, document.currentScript.src.length - 3) + '.html').then(function(response) {
        response.text(function(result) {
            callback(result);
        }, function(error) {
            console.error(error);
        });
    }, function(error) {
        console.error(error);
    });
};