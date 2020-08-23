const OpenWilma = require("./OpenWilma.js")
let session = new OpenWilma()

session._getList().then(async res => {
    console.log("Compatible runtime!")
    session.login("url", "username", "password").then(async res => {
        console.log("Logged in!")
        /*
        let myClass = await session.classes.selfClass();
        console.log(myClass);
        session.classes.getClassStudents(myClass).then((data) => {
            console.log(data);
        });
        */
        session.classes.getSchools().then((data) => {
            session.classes.getClasses(data[0].id).then((data) => {
                data.forEach(element => {
                    session.classes.getClassStudents(element.id).then((data) => {
                        console.log(element.caption, data);
                    });
                });
            });
        });
    }).catch(async err => {
        console.log(err)
    })
}).catch(async err => {
    console.log(err, "\nUnsupported runtime.")
})