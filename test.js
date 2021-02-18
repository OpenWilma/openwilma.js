const OpenWilma = require("./index.js")
let n = new OpenWilma({
   account: {
    username: "-",
    password: "-"
   }, 
   url: "https://google.com"
})
n.connect().then(async session => {
    console.log("Output: " + session)
})