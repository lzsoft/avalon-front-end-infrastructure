window.avalon.auth = {}; {
    let authKey = null;
    window.avalon.auth.set = function(val) {
        authKey = val;
    };
    window.avalon.auth.get = function() {
        return authKey;
    };
}