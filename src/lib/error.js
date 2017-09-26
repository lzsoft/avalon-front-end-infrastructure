window.tingting.error = {};
window.tingting.error.e = new Set();
window.tingting.error.register = function(element) {
    window.tingting.error.e.add(element);
};
window.tingting.error.unregister = function(element) {
    window.tingting.error.e.delete(element);
};
window.tingting.error.trigger = function(source, text) {
    for (let i of window.tingting.error.e) {
        i.dispatchEvent(new CustomEvent("ERROR", { detail: { source, text } }));
    }
};