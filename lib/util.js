'use strict';
window.tingting.util = {};
window.tingting.util.sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
