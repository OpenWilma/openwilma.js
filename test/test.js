// Module testing, CommonJS
let op = require("../dist/index.js")

// Get creds, remember to copy example file to test.config.json!
const testCredentials = require("./test.config.json");

const ses = new op.client()

// akuli TestiSalasana <server ;)>

ses.login(testCredentials, false).then(async account => {
	console.log("Logged in")
	console.log(account)
	let exams = await account.exams.list()
	console.log(exams)
}).catch(err => {
	console.error(err)
})