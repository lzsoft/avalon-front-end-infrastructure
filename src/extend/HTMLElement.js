window.HTMLElement.prototype.importCustomElementTemplateFromHTMLImport = function() {
    this.innerHTML = document.querySelector('link[href*="' + this.tagName.toLowerCase() + '.html"]').import.querySelector("template").innerHTML;
};