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
}, false).then(async account => {
	console.log("Logged in")
	console.log(account)
	//let exams = await account.exams.list()
	//console.log(exams)
	//let messages = await account.messages.list("inbox")
	//console.log(messages)
	let recipients = await account.messages.listRecipients()
}).catch(err => {
	console.error(err)
})