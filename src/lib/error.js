window.avalon.error = {};
window.avalon.error.e = new Set();
window.avalon.error.register = function(element) {
    window.avalon.error.e.add(element);
};
window.avalon.error.unregister = function(element) {
    window.avalon.error.e.delete(element);
};
window.avalon.error.trigger = function(source, text) {
    for (let i of window.avalon.error.e) {
        i.dispatchEvent(new CustomEvent("ERROR", { detail: { source, text } }));
    }
};