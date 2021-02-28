// Simple watcher that automatically compiles the library
const fs = require("fs")
const cp = require("child_process")

const shells = {}

let hold = false

const compile = async () => {
    hold = true
    if(Object.keys(shells).length != 0){
        for(let shell in shells){
            shells[shell].kill("SIGKILL")
        }
    }
    let stderrCache = ""
    let sh = cp.exec("npm run build", async (error) => {
        // Nothing here
    })
    shells[new Date().getTime()] = sh
    sh.stderr.on("data", async data => {
        data = data.toString()
        stderrCache += data
    })
    sh.on("exit", async (code, signal) => {
        if(code != 0){
            try {
                // Flush some useless stuff out
                stderrCache = stderrCache.split("Error:")
                stderrCache.splice(2, 1)
                stderrCache = stderrCache.join("Error:").split("\n")
                stderrCache.splice(stderrCache.length-1, 1)
                stderrCache = stderrCache.join("\n").split("\n")
                stderrCache[stderrCache.length-1] = "Location: " + stderrCache[stderrCache.length-1]
                stderrCache = stderrCache.join("\n")
                console.log(stderrCache)
                hold = false
            }
            catch(err){
                console.log("Build failed and error message parser failed.")
                hold = false
            }
        }else if(signal != "SIGKILL"){
            console.log("\x1b[32mBuilt!\x1b[0m")
            hold = false
        }
    })
}

fs.watch("./", {recursive: true}, async (event, filename) => {
    if(hold){
        if(filename != null && filename.startsWith("dist")){
            console.log("\x1b[34m   Compiled " + filename + "\x1b[0m")
        }
        return
    }
    console.log("\n\x1b[34m[\x1b[0m" + new Date().toUTCString() + "\x1b[34m]\x1b[0m", "\x1b[0mChanges detected (" + filename + ")\x1b[0m")
    compile()
})
console.log("Now watching for changes...")