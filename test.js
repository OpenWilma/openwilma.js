const OpenWilma = require("./OpenWilma.js")
let session = new OpenWilma()

session._getList().then(async res => {
    console.log(res, "\nCompatible runtime!")
    session.login("url", "username", "password").then(async res => {
        console.log(res.body)
    }).catch(async err => {
        console.log(err)
    })
}).catch(async err => {
    console.log(err, "\nUnsupported runtime.")
})