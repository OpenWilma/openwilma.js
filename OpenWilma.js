// -- Modules --
// All of these are loaded dynamically based on the platform you have because of minor differences in the supported platforms.
// These modules will function the same regardless of the platform.
let parser = null
let request = null

// -- Config --
const config = {
    supportedApiVersions: ["11"]
}
// -- Memory --
let memory = {
    session: {
        token: null,
        sessionId: null,
        server: null,
        slug: null,
        serverName: "",
        lastRequest: null,
        secret: null,
        formkey: null
    },
    cache: {
        servers: []
    }
}

// -- Classes --
class messages { //Messages class
    async create(title, recipients, content, showRecipients, CollatedReplies){ //Recipe
        return new Promise(async (resolve, reject) => {
            try {
                //Get recipients 
                this.getRecipients().then(async list => {
                    //Make sure the recipients are valid
                    let validated = true
                    let recipientsList = []
                    let failedI = null
                    for(let i = 0; i < recipients.length; i++){
                        let id = recipients[i]
                        failedI = i
                        let found = false
                        let type = null
                        let pswdId = null
                        for(let i2 = 0; i2 < list.length; i2++){
                            if(id.includes("_")){
                                if(list[i2].passwdid != undefined){
                                    if((list[i2].id + "_" + list[i2].passwdid) == id){
                                        found = true
                                        type = list[i2].type
                                        pswdId = list[i2].passwdid
                                        break
                                    }
                                }
                            }else {
                                if(list[i2].id == id){
                                    found = true
                                    type = list[i2].type
                                    if(list[i2].passwdid != undefined){
                                        pswdId = list[i2].passwdid
                                    }
                                    break
                                }
                            }
                        }
                        if(found == false){
                            validated = false
                            break
                        }else {
                            recipientsList.push({
                                id: id + (pswdId == null || id.includes("_") ? "" : "_" + pswdId),
                                type: type
                            })
                        }
                    }
                    if(validated == false){
                        reject("The recipent in index: " + failedI + ", is invalid.")
                    }else {
                        //Send
                        request.post({
                            url: memory.session.server + "/messages/compose/",
                            body: {
                                format: "json",
                                CompleteJson: null,
                                Subject: title,
                                BodyText: content,
                                wysiwyg: "ckeditor", //Enable html,
                                formkey: memory.session.formkey,
                                secret: memory.session.secret,
                                draftbtn: "Tallenna luonnos", //We want to save the message,
                                CollatedReplies: CollatedReplies.toString(),
                                ShowRecipients: showRecipients.toString(),
                                recipients: await parser.toRecipients(recipientsList)
                            },
                            headers: {
                                Cookie: "Wilma2SID=" + memory.session.token,
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            args: ["!encode=recipients"]
                        }).then(async res => {
                            if(res[1].status == 200){
                                this.getAll("outbox").then(async list => {
                                    this.get(list[0].id).then(async message => {
                                        resolve(message)
                                    }).catch(async err => {
                                        reject(err)
                                    })
                                }).catch(async err => {
                                    reject(err)
                                })
                            }else {
                                reject("Something went wrong while sending the message.")
                            }  
                        }).catch(async err => {
                            reject(err)
                        })
                    }

                }).catch(async err => {
                    reject(err)
                })
            }
            catch(err){
                reject(err)
            }
        })
    }
    async get(id){
        return new Promise(async (resolve, reject) => {
            try {
                request.get({
                    url: memory.session.server + "/messages/" + id + "?format=json",
                    headers: {
                        Cookie: "Wilma2SID=" + memory.session.token
                    }
                }).then(async res => {
                    parser.format(res[1].body).then(async json => {
                        parser.message(json.messages[0]).then(async msg => {
                            let _class = new message()
                            let ar = Object.keys(msg)
                            for(let i = 0; ar.length > i; i++){
                                _class[ar[i]] = msg[ar[i]]
                            }
                            resolve(_class)
                        }).catch(async err => {
                            reject(err)
                        })
                    }).catch(async err => {
                        reject(err)
                    })
                }).catch(async err => {
                    reject(err)
                })
            }
            catch(err){
                reject(err)
            }
        })
    }
    async getAll(category){
        return new Promise(async (resolve, reject) => {
            try {
                let messageDirs = ["archive", "drafts", "outbox", "inbox"]
                if(messageDirs.includes(category)){
                    request.get({
                        url: memory.session.server + "/messages/list" + (category == "inbox" ? "" : "/" + category),
                        headers: {
                            Cookie: "Wilma2SID=" + memory.session.token
                        }
                    }).then(async res => {
                        parser.format(res[1].body).then(async json => {
                            parser.messages(json.Messages).then(async msgs => {
                                memory.cache.messages.inbox = msgs
                                resolve(msgs)
                            })
                        }).catch(async err => {
                            reject(err)
                        })
                    }).catch(async err => {
                        reject(err)
                    })
                }else {
                    reject("Unkown message category. Available categories: " + messageDirs.join(", "))
                }
            }
            catch(err){
                reject(err)
            }
        })
    }
    async getRecipients(){
        return new Promise(async (resolve, reject) => {
            try {
                //Get recipients 
                //I am aware that there are more recipients that what this request gives us. But due to the limits of the testing accounts available these will have to do.
                request.get({
                    url: memory.session.server + "/messages/recipients/?select_recipients&format=json",
                    headers: {
                        Cookie: "Wilma2SID=" + memory.session.token
                    }
                }).then(async res => {
                    //console.log(res[1].body)
                    parser.messageRecipients(res[1].body).then(async res => {
                        resolve(res)
                    }).catch(async err => {
                        reject(err)
                    })
                }).catch(async err => {
                    reject(err)
                })
            }
            catch(err){
                reject(err)
            }
        })
    }

    async send(title, recipients, content, showRecipients, CollatedReplies){ //Recipe
        return new Promise(async (resolve, reject) => {
            try {
                //Get recipients 
                this.getRecipients().then(async list => {
                    //Make sure the recipients are valid
                    let validated = true
                    let recipientsList = []
                    let failedI = null
                    for(let i = 0; i < recipients.length; i++){
                        let id = recipients[i]
                        failedI = i
                        let found = false
                        let type = null
                        let pswdId = null
                        for(let i2 = 0; i2 < list.length; i2++){
                            if(id.includes("_")){
                                if(list[i2].passwdid != undefined){
                                    if((list[i2].id + "_" + list[i2].passwdid) == id){
                                        found = true
                                        type = list[i2].type
                                        pswdId = list[i2].passwdid
                                        break
                                    }
                                }
                            }else {
                                if(list[i2].id == id){
                                    found = true
                                    type = list[i2].type
                                    if(list[i2].passwdid != undefined){
                                        pswdId = list[i2].passwdid
                                    }
                                    break
                                }
                            }
                        }
                        if(found == false){
                            validated = false
                            break
                        }else {
                            recipientsList.push({
                                id: id + (pswdId == null || id.includes("_") ? "" : "_" + pswdId),
                                type: type
                            })
                        }
                    }
                    if(validated == false){
                        reject("The recipent in index: " + failedI + ", is invalid.")
                    }else {
                        //Send
                        request.post({
                            url: memory.session.server + "/messages/compose/",
                            body: {
                                format: "json",
                                CompleteJson: null,
                                Subject: title,
                                BodyText: content,
                                wysiwyg: "ckeditor", //Enable html,
                                formkey: memory.session.formkey,
                                secret: memory.session.secret,
                                addsavebtn: "Lähetä viesti", //We want to send the message,
                                CollatedReplies: CollatedReplies.toString(),
                                ShowRecipients: showRecipients.toString(),
                                recipients: await parser.toRecipients(recipientsList)
                            },
                            headers: {
                                Cookie: "Wilma2SID=" + memory.session.token,
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            args: ["!encode=recipients"]
                        }).then(async res => {
                            if(res[1].status == 200 && res[1].body.includes('<strong>Viesti on nyt lähetetty.</strong>')){
                                this.getAll("outbox").then(async list => {
                                    this.get(list[0].id).then(async message => {
                                        resolve(message)
                                    }).catch(async err => {
                                        reject(err)
                                    })
                                }).catch(async err => {
                                    reject(err)
                                })
                            }else {
                                reject("Something went wrong while sending the message.")
                            }  
                        }).catch(async err => {
                            reject(err)
                        })
                    }

                }).catch(async err => {
                    reject(err)
                })
            }
            catch(err){
                reject(err)
            }
        })
    }
}
class message extends messages { //Class for each message
    constructor(){
        super()
        //Then disable some stuff
        this.create = undefined
    }
    async archive(){
        return new Promise(async (resolve, reject) => {
            try {
                if(this.folder == "inbox"){
                    request.post({
                        url: memory.session.server + "/messages/archivetool/",
                        body: {
                            formkey: memory.session.formkey, //These credentials are sometimes not needed? We'll include these just in case as wilma alaways includes these regardless. (second entry below this comment)
                            secret: memory.session.secret,
                            mid: this.id
                        },
                        headers: {
                            Cookie: "Wilma2SID=" + memory.session.token,
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }).then(async res => {
                        if(res[1].status == 200){
                            resolve()
                        }
                    }).catch(async err => {
                        reject(err)
                    })
                }else {
                    reject("Cannot archive a message that is not in the inbox")
                }
            }
            catch(err){
                reject(err)
            }
        })
    }
    async unArchive(){
        return new Promise(async (resolve, reject) => {
            try {
                if(this.folder == "archive"){
                    request.post({
                        url: memory.session.server + "/messages/restorearchived/",
                        body: {
                            formkey: memory.session.formkey, //These credentials are sometimes not needed? We'll include these just in case as wilma alaways includes these regardless. (second entry below this comment)
                            secret: memory.session.secret,
                            mid: this.id
                        },
                        headers: {
                            Cookie: "Wilma2SID=" + memory.session.token,
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }).then(async res => {
                        if(res[1].status == 200){
                            resolve()
                        }
                    }).catch(async err => {
                        reject(err)
                    })
                }else {
                    reject("Cannot unarchive a message that is not in the archive")
                }
            }   
            catch(err){
                reject(err)
            }
        })
    }
    async delete(){
        return new Promise(async (resolve, reject) => {
            try {
                request.post({
                    url: memory.session.server + "/messages/delete/",
                    body: {
                        formkey: memory.session.formkey, //These credentials are sometimes not needed? We'll include these just in case as wilma alaways includes these regardless. (second entry below this comment)
                        secret: memory.session.secret,
                        mid: this.id
                    },
                    headers: {
                        Cookie: "Wilma2SID=" + memory.session.token,
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).then(async res => {
                    if(res[1].status == 200){
                        resolve()
                    }
                }).catch(async err => {
                    reject(err)
                })
            }   
            catch(err){
                reject(err)
            }
        })
    }
    async edit(newtitle, newrecipients, newcontent, showRecipients, CollatedReplies){
        return new Promise(async (resolve, reject) => {
            try {
                if(this.folder == "drafts"){
                    if(newrecipients != null){
                        //Get recipients 
                        this.getRecipients().then(async list => {
                            //Make sure the recipients are valid
                            let validated = true
                            let recipientsList = []
                            let failedI = null
                            for(let i = 0; i < newrecipients.length; i++){
                                let id = newrecipients[i]
                                failedI = i
                                let found = false
                                let type = null
                                let pswdId = null
                                for(let i2 = 0; i2 < list.length; i2++){
                                    if(id.includes("_")){
                                        if(list[i2].passwdid != undefined){
                                            if((list[i2].id + "_" + list[i2].passwdid) == id){
                                                found = true
                                                type = list[i2].type
                                                pswdId = list[i2].passwdid
                                                break
                                            }
                                        }
                                    }else {
                                        if(list[i2].id == id){
                                            found = true
                                            type = list[i2].type
                                            if(list[i2].passwdid != undefined){
                                                pswdId = list[i2].passwdid
                                            }
                                            break
                                        }
                                    }
                                }
                                if(found == false){
                                    validated = false
                                    break
                                }else {
                                    recipientsList.push({
                                        id: id + (pswdId == null || id.includes("_") ? "" : "_" + pswdId),
                                        type: type
                                    })
                                }
                            }
                            if(validated == false){
                                reject("The recipent in index: " + failedI + ", is invalid.")
                            }else {
                                request.post({
                                    url: memory.session.server + "/messages/compose",
                                    body: {
                                        mid: this.id,
                                        format: "json",
                                        CompleteJson: null,
                                        Subject: newtitle != null ? newtitle : this.title,
                                        BodyText: newcontent != null ? newcontent : this.content,
                                        wysiwyg: "ckeditor", //Enable html,
                                        formkey: memory.session.formkey,
                                        secret: memory.session.secret,
                                        draftbtn: "Tallenna luonnos", //We want to save the message,
                                        CollatedReplies: CollatedReplies != null ? CollatedReplies.toString() : this.permissions.reply.toString(),
                                        ShowRecipients: showRecipients != null ? showRecipients.toString() : this.permissions.forward.toString(),
                                        recipients: await parser.toRecipients(recipientsList)
                                    },
                                    headers: {
                                        Cookie: "Wilma2SID=" + memory.session.token,
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                    args: ["!encode=recipients"]
                                }).then(async res => {
                                    this.getAll("drafts").then(async list => {
                                        this.get(list[0].id).then(async message => {
                                            if(message != this){
                                                resolve(message)
                                            }else {
                                                reject("Failed to edit draft.")
                                            }
                                        }).catch(async err => {
                                            reject(err)
                                        })
                                    }).catch(async err => {
                                        reject(err)
                                    })
                                }).catch(async err => {
                                    reject(err)
                                })
                            }

                        }).catch(async err => {
                            reject(err)
                        })
                    }else {
                        //Fetch existing data
                        request.get({
                            url: memory.session.server + "/messages/compose?mid=" + this.id,
                            headers: {
                                Cookie: "Wilma2SID=" + memory.session.token
                            }
                        }).then(async res => {
                            parser.draftRecipients(res[1].body).then(async list => {
                                //Now we have a list of the existing recipients (which is stupidly hard to get)
                                //Send
                                request.post({
                                    url: memory.session.server + "/messages/compose/",
                                    body: {
                                        mid: this.id,
                                        format: "json",
                                        CompleteJson: null,
                                        Subject: newtitle != null ? newtitle : this.title,
                                        BodyText: newcontent != null ? newcontent : this.content,
                                        wysiwyg: "ckeditor", //Enable html,
                                        formkey: memory.session.formkey,
                                        secret: memory.session.secret,
                                        draftbtn: "Tallenna luonnos", //We want to save the message,
                                        CollatedReplies: CollatedReplies != null ? CollatedReplies.toString() : this.permissions.reply.toString(),
                                        ShowRecipients: showRecipients != null ? showRecipients.toString() : this.permissions.forward.toString(),
                                        recipients: await parser.toRecipients(list)
                                    },
                                    headers: {
                                        Cookie: "Wilma2SID=" + memory.session.token,
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                    args: ["!encode=recipients"]
                                }).then(async res => {
                                    this.getAll("drafts").then(async list => {
                                        this.get(list[0].id).then(async message => {
                                            resolve(message)
                                        }).catch(async err => {
                                            reject(err)
                                        })
                                    }).catch(async err => {
                                        reject(err)
                                    })
                                }).catch(async err => {
                                    reject(err)
                                })
                            }).catch(async err => {
                                reject(err)
                            })
                        }).catch(async err => {
                            reject(err)
                        })  
                    }
                }else {
                    reject("Cannot edit a message that is not the drafts folder.")
                }
            }
            catch(err){
                reject(err)
            }
        })
    }
    async sendDraft(){
        return new Promise(async (resolve, reject) => {
            try {
                if(this.folder == "drafts"){
                    //Fetch existing data
                    request.get({
                        url: memory.session.server + "/messages/compose?mid=" + this.id,
                        headers: {
                            Cookie: "Wilma2SID=" + memory.session.token
                        }
                    }).then(async res => {
                        parser.draftRecipients(res[1].body).then(async list => {
                            //Now we have a list of the existing recipients (which is stupidly hard to get)
                            //Send
                            request.post({
                                url: memory.session.server + "/messages/compose/",
                                body: {
                                    mid: this.id,
                                    format: "json",
                                    CompleteJson: null,
                                    Subject: this.title,
                                    BodyText: this.content,
                                    wysiwyg: "ckeditor", //Enable html,
                                    formkey: memory.session.formkey,
                                    secret: memory.session.secret,
                                    addsavebtn: "Lähetä viesti", //We want to send the message,
                                    CollatedReplies: this.permissions.reply.toString(),
                                    ShowRecipients: this.permissions.forward.toString(),
                                    recipients: await parser.toRecipients(list)
                                },
                                headers: {
                                    Cookie: "Wilma2SID=" + memory.session.token,
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                args: ["!encode=recipients"]
                            }).then(async res => {
                                this.getAll("outbox").then(async list => {
                                    if(list[0].id == this.id){
                                        this.get(list[0].id).then(async message => {
                                            resolve(message)
                                        }).catch(async err => {
                                            reject(err)
                                        })   
                                    }else {
                                        reject("Failed to send the message")
                                    }
                                }).catch(async err => {
                                    reject(err)
                                })
                            }).catch(async err => {
                                reject(err)
                            })
                        }).catch(async err => {
                            reject(err)
                        })
                    }).catch(async err => {
                        reject(err)
                    })  
                }else {
                    reject("Cannot send a message that is not in the drafts folder.")
                }
            }
            catch(err){
                reject(err)
            }
        })
    }
    async forward(){
        //WIP
    }
    async reply(content, showRecipients, CollatedReplies){
        return new Promise(async (resolve, reject) => {
            try {
                if(this.permissions.reply == true){
                    //Collated reply
                    request.post({
                        url: memory.session.server + "/messages/collatedreply/" + this.id,
                        body: {
                            format: "json",
                            CompleteJson: null,
                            BodyText: content,
                            wysiwyg: "ckeditor", //Enable html,
                            formkey: memory.session.formkey,
                            secret: memory.session.secret
                        },
                        headers: {
                            Cookie: "Wilma2SID=" + memory.session.token,
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }).then(async res => {
                        resolve()
                    }).catch(async err => {
                        reject(err)
                    })
                }else {
                    this.send("RE: " + this.title, [this.author.id], content, showRecipients, CollatedReplies).then(async res => {
                        resolve(res)
                    }).catch(async err => {
                        reject(err)
                    })
                }
            }
            catch(err){
                reject(err)
            }
        })
    }
    async recall(){
        return new Promise(async (resolve, reject) => {
            try {
                if(this.folder == "outbox"){
                    request.post({
                        url: memory.session.server + "/messages/recall/" + this.id,
                        body: {
                            formkey: memory.session.formkey, //These credentials are sometimes not needed? We'll include these just in case as wilma alaways includes these regardless. (second entry below this comment)
                            secret: memory.session.secret,
                            mid: this.id
                        },
                        headers: {
                            Cookie: "Wilma2SID=" + memory.session.token,
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }).then(async res => {
                        if(res[1].status == 200){
                            resolve()
                        }
                    }).catch(async err => {
                        reject(err)
                    })
                }else {
                    reject("Cannot recall a message that is not in the sent folder")
                }
            }   
            catch(err){
                reject(err)
            }
        })
    }
}
class schedule { //Schedule class
    async get(date){
        return new Promise(async (resolve, reject) => {
            try {
                if(/([0-9]{1,})\.([0-9]{1,})\.([0-9]{1,})/g.test(date)){
                    request.get({
                        url: memory.session.server + "/schedule?date=" + date,
                        headers: {
                            "Cookie": "Wilma2SID=" + memory.session.token + ";"
                        }
                    }).then(async res => {
                        parser.schedule(res[1].body).then(async json => {
                            resolve(json)
                        }).catch(async err => {
                            reject(err)
                        }) 
                    }).catch(async err => {
                        reject(err)
                    })  
                }else {
                    reject("Invalid date format")
                }
            }
            catch(err){
                reject(err)
            }   
        })
    }
    async getCurrent(){
        return new Promise(async (resolve, reject) => {
            try {
                request.get({
                    url: memory.session.server + "/schedule",
                    headers: {
                        "Cookie": "Wilma2SID=" + memory.session.token + ";"
                    }
                }).then(async res => {
                    parser.schedule(res[1].body).then(async json => {
                        resolve(json)
                    }).catch(async err => {
                        reject(err)
                    }) 
                }).catch(async err => {
                    reject(err)
                })  
            }
            catch(err){
                reject(err)
            }   
        })
    }
}
class choices {
    //No idea what needed here
}
class exams { //Exams class
    async get(id){
        
    }
    async getAll(){

    }
}
class attendence { //Attendence class
    async get(id){

    }
    async getAll(){

    }
}
class attendenceSingle {
    //Actions per attendence note, no idea what goes here tho
}
class printouts { //Printouts class
    async getAll(){
        return new Promise(async (resolve, reject) => {
            try {
                request.get({
                    url: memory.session.server + "/printouts",
                    headers: {
                        Cookie: "Wilma2SID=" + memory.session.token
                    }
                }).then(async res => {
                    parser.printout(res[1].body).then(async res => {
                        resolve(res)
                    }).catch(async err => {
                        reject(err)
                    })
                }).catch(async err => {
                    reject(err)
                })
            }
            catch(err){
                reject(err)
            }
        })
    }
}
class feedback {
    //No idea what goes here
}
class enrollment {
    //No idea what goes here
}
class trays { //Trays class
    async getAll(){

    }
    async get(period){

    }
    async set(period, position, boolean){
        
    }
}
class news { //News class
    async list(){
        return new Promise(async (resolve, reject) => {
            try {
                request.get({
                    url: memory.session.server + "/news",
                    headers: {
                        Cookie: "Wilma2SID=" + memory.session.token + ";"
                    }
                }).then(async res => {
                    parser.news(res[1].body).then(async res => {
                        resolve(res)
                    }).catch(async err => {
                        reject(err)
                    })
                }).catch(async err => {
                    reject(err)
                })
            }
            catch(err){
                reject(err)
            }
        })
    }
    async get(id){
        return new Promise(async (resolve, reject) => {
            try {
                request.get({
                    url: memory.session.server + "/news/" + id,
                    headers: {
                        Cookie: "Wilma2SID=" + memory.session.token + ";"
                    }
                }).then(async res => {
                    parser.newsEntry(res[1].body).then(async res => {
                        resolve(res)
                    }).catch(async err => {
                        reject(err)
                    })
                }).catch(async err => {
                    reject(err)
                })
            }
            catch(err){
                reject(err)
            }
        })
    }
}
class catalog { //Catalog class
    async get(){

    }
}
class schools {
    async getAll(){
        return new Promise(async (resolve, reject) => {
            try {
                request.get({
                    url: memory.session.server + "/api/v1/schools",
                    headers: {
                        "Cookie": "Wilma2SID=" + memory.session.token + ";"
                    }
                }).then(async res => {
                    parser.format(res[1].body).then(async json => {
                        parser.schools(json).then(async schoolsArray => {
                            resolve(schoolsArray)
                        }).catch(async err => {
                            reject(err)
                        }) 
                    }).catch(async err => {
                        reject(err)
                    }) 
                }).catch(async err => {
                    reject(err)
                })  
            }
            catch(err){
                reject(err)
            }   
        })
    }
    async get(id){
        return new Promise(async (resolve, reject) => {
            try {
                if(typeof id == "number"){
                    request.get({
                        url: memory.session.server + "/api/v1/schools/" + id + "/classes",
                        headers: {
                            "Cookie": "Wilma2SID=" + memory.session.token + ";"
                        }
                    }).then(async res => {
                        parser.format(res[1].body).then(async json => {
                            parser.classes(json).then(async res => {
                                if(res.length == 0){
                                    resolve([])
                                }else {
                                    let construct = []
                                    for(let i = 0; res.length > i; i++){
                                        try {
                                            await request.get({
                                                url: memory.session.server + "/profiles/classes/" + res[i].id,
                                                headers: {
                                                    "Cookie": "Wilma2SID=" + memory.session.token + ";"
                                                }
                                            }).then(async res2 => {
                                                await parser.classStudents(res2[1].body).then(async students => {
                                                    res[i].students = students
                                                    construct.push(res[i])
                                                }).catch(async err => {
                                                    reject(err)
                                                }) 
                                            }).catch(async err => {
                                                reject(err)
                                            })  
                                        }
                                        catch(err){
                                            reject(err)
                                        }   
                                    }   
                                    resolve(construct)
                                }
                            }).catch(async err => {
                                reject(err)
                            }) 
                        }).catch(async err => {
                            reject(err)
                        }) 
                    }).catch(async err => {
                        reject(err)
                    })
                }else {
                    reject("Id must be a number")
                }
            }
            catch(err){
                reject(err)
            }
        })
    }
}
class profile { //Profile class
    async self(){ //Get the active userinfo
        //Self group id goes here
    }
    async get(id){

    }
    async getAll(){

    }
}
class strategy { //Strategy class
    async list(){

    }
    async get(id){

    }
}
class forms { //Forms class
    async list(){

    }
    async get(id){

    }
}
// Main class
class OpenWilma {
    constructor(options){
        // Options
        this.options = options
        // Classes
        this.messages = new messages()
        this.schedule = new schedule()
        this.choices = new choices()
        this.exams = new exams()
        this.attendence = new attendence()
        this.printouts = new printouts()
        this.feedback = new feedback()
        this.enrollment = new enrollment()
        this.trays = new trays()
        this.news = new news()
        this.catalog = new catalog()
        this.profile = new profile()
        this.strategy = new strategy()
        this.forms = new forms()
        this.schools = new schools()
        //TODO: Events?
    }
    /**
     * Get the list of wilma servers
     * @returns Promise([error, http(s)_response])
     */
    async _getList(){
        return new Promise(async (resolve, reject) => {
            try {
                request.get({
                    url: "https://www.starsoft.fi/wilmat/wilmat.json",
                }).then(async result => {
                    if(result[1].status == 200){
                        parser.format(result[1].body).then(async data => {
                            memory.cache.servers = data.wilmat
                            memory.session.lastRequest = new Date().getTime()
                            resolve([null, data.wilmat])  
                        }).catch(async err => {
                            reject([err, result])
                        })
                    }else {
                        reject([false, result])
                    }
                }).catch(async err => {
                    reject([err, result])
                })
            }
            catch(err){
                reject([err, null])
            }
        })
    }
    /**
     * Refresh the session if it's not being upkept with normal requests
     */
    async _refreshSession(){
        if(this.refreshLoop != null) this.refreshLoop = null
        this.refreshLoop = setInterval(async () => {
            if((memory.session.lastRequest + 25) >= new Date().getTime()){
                request.get({
                    url: memory.session.server + "/overview", //Is this valid?
                    args: ["NoRedirects"],
                    headers: {
                        "Cookie": "Wilma2SID=" + memory.session.token + ";"
                    }
                }).then(async res => {
                    memory.session.lastRequest = new Date().getTime()
                }).catch(async err => {
                    throw new Error(err)
                })
            }
        }, 500)
    }
    /**
     * Login to a secondary account that the logged in account has permission to control
     * @param {*} id 
     */
    async setUser(id){

    }

    /**
     * Returns Server URL with slug, or without
     * @returns {null|*}
     */
    getServerURLWithSlug() {
        if (memory.session.slug)
            return memory.session.server+memory.session.slug;
        return memory.session.server;
    }

    /**
     * Login to a Wilma server
     * @param {String} server The Wilma server
     * @param {String} username The username of the Wilma account
     * @param {String} password The password of the Wilma account
     * @returns Promise(roleRequired)
     */
    async login(server, username, password){ //Login to wilma
        return new Promise(async (resolve, reject) => {
            try {
                //Check URL format
                if(/(https|http)(:\/\/)(.{1,})\//g.test(server) || !/(https|http)(:\/\/)(.{1,})/g.test(server)){
                    reject("Invalid server url format.")
                    return
                }
                this._getList().then(async res => {
                    if(res[0] != null){
                        reject(res[0])
                    }else {
                        let found = false
                        for(let i = 0;i < res[1].length;i++){
                            if(res[1][i].url === server){
                                memory.session.server = server
                                memory.session.serverName = res[1][i].name
                                found = true
                                break
                            }
                        }
                        if (memory.session.server == null){
                            // bypassing server validation
                            memory.session.server = server;
                            memory.session.serverName = 'Unknown Server';
                        }
                        // @dfJ: In my opinion, not best server validation, better to skip this check, and rely on index_json request. If it fails, invalid URL

                        /*if(found == false && (validateServer != false || validateServer == undefined)){
                            reject("No such Wilma server available.")
                        } else {
                        }*/
                        request.get({
                            url: server + "/index_json"
                        }).then(async res1 => {
                            if(res1[0] != null){
                                reject(res1[0])
                            }else {
                                parser.format(res1[1].body).then(async data => {
                                    if(config.supportedApiVersions.includes(data.ApiVersion.toString())){
                                        if(data.SessionID != undefined){
                                            memory.session.sessionId = data.SessionID
                                            request.post({
                                                url: server + "/login",
                                                body: {
                                                    Login: username,
                                                    Password: password,
                                                    SESSIONID: data.SessionID,
                                                    CompleteJson: null,
                                                    format: "Json"
                                                },
                                                headers: {
                                                    "Content-Type": "application/x-www-form-urlencoded"
                                                },
                                                args: ["NoRedirects"]
                                            }).then(async res2 => {
                                                if(res2[0] != null){
                                                    reject(res2[0])
                                                }else {
                                                    if(res2[1].error != undefined){
                                                        reject(res2[1])
                                                    }else {
                                                        if(res2[1].cookies.Wilma2SID == undefined){
                                                            reject("Invalid username or password")
                                                        }else {
                                                            // Save session id
                                                            memory.session.token = res2[1].cookies.Wilma2SID.value;
                                                            // Check for roles
                                                            request.get({
                                                                url: this.getServerURLWithSlug()+"/?format=json",
                                                                headers: {
                                                                    "Cookie": "Wilma2SID=" + memory.session.token + ";"
                                                                }
                                                            }).then(async res => {
                                                                let roleRequired = parser.roleSelectorExists(res[1].body);
                                                                //Get the secret and formkey
                                                                if (!roleRequired) {
                                                                    request.get({
                                                                        url: server + "/messages",
                                                                        headers: {
                                                                            "Cookie": "Wilma2SID=" + memory.session.token + ";"
                                                                        }
                                                                    }).then(async res => {
                                                                        parser.credentials(res[1].body).then(async ar => {
                                                                            memory.session.secret = ar[0]
                                                                            memory.session.formkey = ar[1]
                                                                            //Done
                                                                            memory.session.lastRequest = new Date().getTime()
                                                                            this._refreshSession()
                                                                            resolve(roleRequired)
                                                                        }).catch(async err => {
                                                                            reject(err)
                                                                        })
                                                                    }).catch(async err => {
                                                                        reject(err)
                                                                    });
                                                                } else {
                                                                    resolve(roleRequired);
                                                                }
                                                            }).catch(async err => {
                                                                reject(err)
                                                            });
                                                        }
                                                    }
                                                }
                                            }).catch(async err1 => {
                                                reject(err1)
                                            })
                                        }else {
                                            reject("SessionID missing from response body.")
                                        }
                                    }else {
                                        reject("Unsupported ApiVersion: " + data.ApiVersion + ", supported: " + config.supportedApiVersions.join(", "))
                                    }
                                }).catch(async err => {
                                    reject("Unexpected parser error: " + err)
                                })
                            }
                        }).catch(async err => {
                            reject(err)
                        })
                    }   
                })
            }
            catch(err){
                reject(err)
            }
        })
    }

    async getRoles() {
        return new Promise(async (resolve, reject) => {
            try {
                request.get({
                    url: this.getServerURLWithSlug()+"/?format=json",
                    headers: {
                        "Cookie": "Wilma2SID=" + memory.session.token + ";",
                    }
                }).then(async res => {
                    if(res[0] != null){
                        reject(res[0]);
                        return;
                    }
                    console.log("res!");
                    parser.parseRoles(res[1].body).then();
                }).catch(err => {
                    reject(err);
                })
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * Logout from the Wilma server
     */
    async logout(){ //Logout from wilma. TODO: Does this work...?
        return new Promise(async (resolve, reject) => {
            try {
                request.post({
                    url: memory.session.server + "/logout",
                    headers: {
                        "Cookie": "Wilma2SID=" + memory.session.token + ";",
                        CompleteJson: null,
                        format: "Json",
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: {
                        FormKey: memory.session.sessionId
                    },
                    args: ["NoRedirects"]
                }).then(async res => {
                    resolve()
                }).catch(async err => {
                    reject(err)
                })
            }
            catch(err){
                reject(err)
            }   
        })
    }
}

// -- Export --
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory)
        //TODO: add dependencies for this platform
    } else if (typeof module === 'object' && module.exports) {
        // Run in Node.JS mode
        parser = require("./bin/parser.js")
        request = require("./bin/requestNode.js")
        module.exports = factory()
    } else {
        // Run in browser mode, please note that Cross-origin requests must be allowed.
        document.write('<' + 'script src="' + "./bin/parser.js" + '"' + ' type="text/javascript"><' + '/script>');
        document.write('<' + 'script src="' + "./bin/requestBrowser.js" + '"' +' type="text/javascript"><' + '/script>');
        root.returnExports = factory()
    }
}(typeof self !== 'undefined' ? self : this, function () {
    //Return the main class as the exported data
    return OpenWilma
}));
