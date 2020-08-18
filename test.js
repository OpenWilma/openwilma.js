const OpenWilma = require("./OpenWilma.js")
let session = new OpenWilma()

session._getList().then(async res => {
    console.log(res, "\nCompatible runtime!")
}).catch(async err => {
    console.log(err, "\nUnsupported runtime.")
})