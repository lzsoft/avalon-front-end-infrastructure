window.Lzsoft.Import.ByTagImport = function(self) {
    'use strict';
    self.innerHTML = document.querySelector('link[href*="' + self.tagName.toLowerCase() + '.html"]').import.querySelector("template").innerHTML;
};
