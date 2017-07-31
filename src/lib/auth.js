window.tingting.auth = {}; {
    let authKey = null;
    window.tingting.auth.set = function(val) {
        authKey = val;
    };
    window.tingting.auth.get = function() {
        return authKey;
    };
}