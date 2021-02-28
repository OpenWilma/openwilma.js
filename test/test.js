// Module testing, CommonJS
let op = require("../dist/index.js")

// Get cred
const username = process.argv[2]
const password = process.argv[3]
const server = process.argv[4]

const ses = new op.client()

// akuli TestiSalasana <server ;)>

ses.login({
	username: username,
	password: password,
	server: server
}, false).then(account => {
	console.log("Logged in")
	console.log(account)
	account.exams.list()
}).catch(err => {
	console.error(err)
})