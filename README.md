<p align="center"><img height="200" src="https://i.imgur.com/2qPpef0.png"><br>
 <a href="https://discord.gg/husTxHa">Chat with us on Discord!</a> | <a href="https://github.com/OpenWilma">Organization</a><br><u>Maintainers</u><br><img height="20" align="center"src="https://avatars2.githubusercontent.com/u/34211401?s=60&v=4"><a href="https://github.com/Esinko">Esinko</a> | <img align="center" height="20" src="https://avatars3.githubusercontent.com/u/46541386?s=460&u=0b7735ff22a2f572b4302f479a0596cbd5c2923d&v=4"><a href="https://github.com/ahnl">Miksu <i>(ahnl)</i></a>
</p>

---

A Node.js and browser library for interacting with the Wilma API. <br>Use this simple and secure library to create your own Wilma enabled applications!
#### (Library still in development, do not use in production)

# Installation 
## Node.js
This Node.js module is not yet available through the npm registry, since it is still heavily in developement and not stable.

Before installing, download and install Node.js. 

Installation is done using the npm install command, which in our case pulls the module from GitHub:

```
$ npm install OpenWilma/openwilma_js
```

## Browser
Download this repository to your site. You can use this link:
#### [Master.zip](https://github.com/OpenWilma/openwilma_js/archive/master.zip)

# Quick Start
This is a simple tutorial on how to get started with OpenWilma. Please follow the correct instructions for your specific platform.

## Step 1

Make sure you have imported OpenWilma to your project based on your platform using the following instructions.

For Node.js, do:
```js
const OpenWilma = require('openwilma');
```
For browsers, do (make sure to correct the path, if needed):
```html
<script src="/OpenWilma/OpenWilma.js"></script>
```

## Step 2
Make a new instance of OpenWilma.
<br>For Node.js, do:
```js
const api = new OpenWilma()
```
For browsers (use script tags!), do:
```html
<script>
    const api = new OpenWilma()
</script>
```

## Step 3
Login to your Wilma account.
<br>For Node.js, do:
```js
api.login("https://my_wilma_server.inschool.fi", "my_username", "my_secure_password").then(async result => {
    //You are logged in!
}).catch(async error => {
    console.log("Something went wrong: ", err)
})
```
For browsers, do:
```html
<script>
    api.login("https://my_wilma_server.inschool.fi", "my_username", "my_secure_password").then(async result => {
    //You are logged in!
}).catch(async error => {
    console.log("Something went wrong: ", err)
})
</script>
```

## Step 4
Perform some simple operations against the Wilma "api". Below there will be a **complete** script to get the logged in users schedule.
For Node.js:
```js
const OpenWilma = require("openwilma")
const api = new OpenWilma()
api.login("https://my_wilma_server.inschool.fi", "my_username", "my_secure_password").then(async result => {
    //You are logged in!
}).catch(async error => {
    console.log("Something went wrong: ", err)
})
```
For browsers (make sure to correct paths, if needed):
```html
<script src="/OpenWilma/OpenWilma.js"></script>
<script>
    const api = new OpenWilma()
    api.login("https://my_wilma_server.inschool.fi", "my_username", "my_secure_password").then(async result => {
    //You are logged in!
}).catch(async error => {
    console.log("Something went wrong: ", err)
})
</script>
```

## Common errors
- ```No such wilma server available```, This means that the server you are trying to connect is not on the list of "offical" wilma server. It does not matter if your server is not "offically" supported, it may still work. You just need to bypass the server check by adding one more parameter to the .login() function. You need to add "false", which would look like this: 
```js
    //<OpenWilma> is known as "api" in this tutorial
    <OpenWilma>.login("https://my_wilma_server.inschool.fi", "my_username", "my_secure_password", false)
```

## Extras
There! You now have a working sample of how to use OpenWilma. You should look at this repository's wiki for more things you can do with OpenWilma.<br>
Next you can check `test.js` or `test.html` for the latest working examples/tests.
#### (Wiki still work in progress)

# Related repositories
Wilma API wiki: (To be created)
<br>Wilma API response parsing guidelines: [Parsing](https://github.com/OpenWilma/parsing)

# Development 
To see what is being worked on, take a look in the pull requests and branches of this repo. Please feel free to join our [Discord server](https://discord.gg/husTxHa).
<br>
 ##### The Esinko branch: [Esinko-Branch](https://github.com/OpenWilma/openwilma_js/tree/Esinko)
# License
```See LICENSE```
