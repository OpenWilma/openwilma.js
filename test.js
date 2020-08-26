const OpenWilma = require("./OpenWilma.js")
let session = new OpenWilma()

session._getList().then(async res => { //FOR TESTING ONLY, NOT REQUIRED
    console.log("Compatible runtime!")
    session.login("url", "username", "password").then(async res => {
        console.log("Logged in!")
        session.news.list().then(async res => {
            session.news.get(res.latest[0].id).then(async res => {
                console.log(res)
            }).catch(async err => {
                console.log(err)
            })
        }).catch(async err => {
            console.log(err)
        })
    }).catch(async err => {
        console.log(err)
    })
}).catch(async err => {
    console.log(err, "\nUnsupported runtime.")
})