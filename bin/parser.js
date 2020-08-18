//Data parser
class Parser {
    async messages(){

    }
    async format(data){
        return new Promise(async (resolve, reject) => {
            try {
                resolve(JSON.parse(data))
            }
            catch(err){
                reject(err)
            }
        })
    }
    //..etc
}
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory)
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory()
    } else {
        parser = new Parser()
    }
}(typeof self !== 'undefined' ? self : this, function () {
    return new Parser()
}));