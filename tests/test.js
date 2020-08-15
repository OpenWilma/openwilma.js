const OpenWilma = require("../OpenWilma.js")
let session = new OpenWilma()

session._checkUrl().then(async res => {
    console.log("Compatible runtime!")
}).catch(async err => {
    console.log("Unsupported runtime: " + err)
})