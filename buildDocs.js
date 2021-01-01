const jsdoc2md = require('jsdoc-to-markdown')
const fs = require("fs")
jsdoc2md.render({ files: "*.js" }).then(async data => {
    // Move some stuff
    data = data.split('<a name="OpenWilma"></a>')
    data[0] = '# Table of contents\n' + data[0].trimLeft()
    data[1] = data[1].replace(/(^)## /gm, "---\n## ")
    data = data.join("\n# Documentation\nDefenitions for each item. *see Table of contents*<br>")
    data = data + "\n---\n# End\nThese docs where generated with the ```buildDocs.js``` and can be easily regenerated with ```npm run build``` if there have been any changes to the Source Code"
    fs.writeFileSync("./Docs.md", data)
    console.log("Docs built")
})