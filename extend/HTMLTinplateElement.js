window.HTMLTinplateElement = class extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        console.log("HTE");
        this.innerHTML = document.querySelector('link[href*="' + this.tagName.toLowerCase() + '.html"]').import.querySelector("template").innerHTML;
    }
}
