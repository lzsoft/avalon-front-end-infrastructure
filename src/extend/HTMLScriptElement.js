window.HTMLScriptElement.loadSameNameHTML = async function() {
    let path = document.currentScript.src.substr(0, document.currentScript.src.length - 3) + '.html';
    return await (await (fetch(path)).text());
};