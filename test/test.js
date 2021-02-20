// Module testing, CommonJS
let op = require("../dist/index.js")

// Get cred
const username = process.argv[2]
const password = process.argv[3]
const server = process.argv[4]

const ses = new op.client()

ses.login({
    username: username,
    password: password,
    server: server
}).then(login => {
    console.log("session: "+login);
}).catch(err => {
    console.error(err);
})