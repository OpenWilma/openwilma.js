const wilma = require("../OpenWilma.js")
let session = new wilma()

session._checkUrl().then(async res => {
    console.log("Compatible runtime!")
}).catch(async err => {
    console.log("Unsupported runtime: " + err)
})