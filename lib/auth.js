'use strict'; {
    let authKey = null;
    window.Lzsoft.Auth.Set = function(val) {
        authKey = val;
    };
    window.Lzsoft.Auth.Get = function() {
        return authKey;
    };
}
