'use strict';
window.HTMLTinplateElement = class extends HTMLElement {
    constructor() {
        super();
        // In the future, optimize the template getting process and implement shadowRoot here
        this.innerHTML = document.querySelector('link[href*="' + this.tagName.toLowerCase() + '.html"]').import.querySelector("template").innerHTML;
    }
}
