window.tingting.error = {};
window.tingting.error.e = {};
window.tingting.error.register = function(element) {
    window.tingting.error.e[element] = 1;
};
window.tingting.error.unregister = function(element) {
    delete window.tingting.error.e[element];
};
window.tingting.error.trigger = function(source, text) {
    for (let i in window.tingting.error.e) {
        i.dispatchEvent(new CustomEvent("ERROR", { detail: { source, text } }));
    }
};