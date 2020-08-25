const OpenWilma = require("./OpenWilma.js")
let session = new OpenWilma()

session._getList().then(async res => {
    console.log("Compatible runtime!")
    session.login("url", "username", "password").then(async res => {
        console.log("Logged in!")
        session.news.list().then(async res => {
            console.log(res)
        }).catch(async err => {
            console.log(err)
        })
    }).catch(async err => {
        console.log(err)
    })
}).catch(async err => {
    console.log(err, "\nUnsupported runtime.")
})