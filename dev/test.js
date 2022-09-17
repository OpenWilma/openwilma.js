const lib = require("../build")
require("dotenv").config({ path: "./dev/.env" })

;(async () => {
    console.log("1. Do we have functions?")
    console.log("   We got: " + Object.keys(lib).length)

    console.log("2. Can we fetch valid servers?")
    const servers = await lib.listServers()
    console.log("   Got: " + servers.length)

    console.log("3. Can we check the validity of a server?")
    const isValid = await lib.validateServer("https://helsinki.inschool.fi")
    console.log("   Got: " + isValid)

    console.log("4. Can we login? (to: " + process.env.wURL + ")")
    const session = await lib.session.create({
        url: process.env.wURL,
        username: process.env.wUSERNAME,
        password: process.env.wPASSWORD,
        validateServer: false
    })
    console.log("   Got:", session)
    
})();
