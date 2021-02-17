const OpenWilma = require("./OpenWilma.js")
let session = new OpenWilma()

let server = process.argv[2]
let user = process.argv[3]
let password = process.argv[4]

session._getList().then(async res => { //FOR TESTING ONLY, NOT REQUIRED
    console.log("Compatible runtime!")
    session.login(server, user, password, false).then(async res => {
        console.log("Logged in!")

        session.news.list().then(a => console.log(a))
        //Tests for messages redacted for privacy reasons
    }).catch(async err => {
        console.log(err)
    })
}).catch(async err => {
    console.log(err, "\nUnsupported runtime.")
})
