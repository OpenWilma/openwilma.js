/* eslint-disable @typescript-eslint/no-var-requires */

const { loginToWilma } = require("../dist/index.js")
const path = require("path")

// todo: use path.join()
require("dotenv").config({
    path: path.join(__dirname, "/.test.env")
})

const server = process.env.WILMA_SERVER
const username = process.env.WILMA_USERNAME
const password = process.env.WILMA_PASSWORD

loginToWilma({
    server,
    username,
    password,
})
    .then(async (account) => {
        console.log("Logged in")

        const user = await account.getUser()

        console.log(user)

        const exams = await user.exams.list()

        console.log(exams)

    })
    .catch(console.log)