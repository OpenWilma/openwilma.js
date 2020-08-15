//Data parser
class Parser {
    async messages(){

    }
    async format(data){
        try {
            return JSON.parse(data)
        }
        catch(err){
            throw new Error("Invalid data recieved: " + err)
        }
    }
    //..etc
}
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory)
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory()
    } else {
        root.returnExports = factory()
  }
}(typeof self !== 'undefined' ? self : this, function () {
    return new Parser()
}));