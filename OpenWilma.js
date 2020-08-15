// Modules (These get replaced with the appropriate module class)
let parser = null
let request = null
// Main class
class OpenWilma {
    constructor(options){
        this.options = options
    }
}

// Export
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory)
    } else if (typeof module === 'object' && module.exports) {
        parser = require("./bin/parser.js")
        request = require("./bin/requestNode.js")
        module.exports = factory()
    } else {
        parser = import("./bin/parser.js")
        request = import("./bin/requestBrowser.js")
        root.returnExports = factory()
  }
}(typeof self !== 'undefined' ? self : this, function () {
    return OpenWilma
}));