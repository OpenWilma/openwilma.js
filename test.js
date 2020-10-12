const OpenWilma = require("./OpenWilma.js")
let session = new OpenWilma()

let server = process.argv[2]
let user = process.argv[3]
let password = process.argv[4]

session._getList().then(async res => { //FOR TESTING ONLY, NOT REQUIRED
    console.log("Compatible runtime!")
    session.login(server, user, password, false).then(async res => {
        console.log("Logged in!")
        session.messages.send("Testi 2", [93876], "Tämä on testiviesti ignore", true, true).then(async res => {
            console.log("Message sent!")
        }).catch(async err => {
            console.log(err)
        })
    }).catch(async err => {
        console.log(err)
    })
}).catch(async err => {
    console.log(err, "\nUnsupported runtime.")
})