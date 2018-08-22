window.avalon.util = {};
window.avalon.util.sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};