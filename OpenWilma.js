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
/**
 * Messages
 * @class
 */
class messages { //Messages class
    /**
     * Creates a message and makes it a draft
     * @param  {string} title Title of the message
     * @param  {array} recipients Recipients in array
     * @param  {string} content Contents of the message
     * @param  {bool} showRecipients Show recipients to the message reciever
     * @param  {bool} CollatedReplies Allow collated replies
     * @returns {Promise<message>} Message
     */
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


    /**
     * Gets a message by its id
     * @param {string} id Id of the message
     * @returns {Promise<message>}
     */
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

      /**
       * Categories archive, drafts, outbox, inbox
     * @typedef Category
     * @property {string!} Category One of: archive, drafts, outbox, inbox
     */


    /**
     * Gets all messages from given category. Categories: archive, drafts, outbox, inbox
     * @param {Category!} Category One of: archive, drafts, outbox, inbox
     * @returns {Promise<message[]>} Array of messages
     */
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

    /**
     * Gets all recipients
     * <h4 style="background:#ff00001a;padding:12px;border-radius:6px; ">
    * <b>Note: This does not return all recipients</b>
    * </h4>
     * @returns {Promise<Array>} Array of recipients
     */
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
                    console.log(res)
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

    /**
     * Creates a message and sends it.
     * @param  {string} title Title of the message
     * @param  {array} recipients Recipients in array
     * @param  {string} content Contents of the message
     * @param  {bool} showRecipients Show recipients to the message reciever
     * @param  {bool} CollatedReplies Allow collated replies
     * @returns {Promise<message>} Message
     */
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

/**
 * Message
 * @class

 */
class message extends messages { //Class for each message
    constructor(){
        super()
        //Then disable some stuff
        this.create = undefined
    }


    /**
     * Archives the message.
     * @returns {boolean} Boolean
     */
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
    /**
     * unArchives the message.
     * @returns {boolean} Boolean
     */
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
    /**
     * Deletes the message.
     * @returns {boolean} Boolean
     */
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

    /**
     * Edits the message
     * @param  {string} newtitle
     * @param  {array} newrecipients
     * @param  {string} newcontent
     * @param  {boolean} showRecipients
     * @param  {boolean} CollatedReplies
     * @returns {Message} The edited message
     */
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
    /**
     * Sends a draft.
     * @returns {boolean} Boolean
     */
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
    /**
     * @param  {string} content
     * @param  {boolean} showRecipients
     * @param  {boolean} CollatedReplies
     * @returns {boolean}
     */
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

    /**
     * Recalls message
     * @returns {boolean}
     */
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

/**
 * @class
 */
class schedule { //Schedule class
    /**
     * Gets the schedule for the date
     * @param {string} date Expects date like: 17.2.2025, 22.09.2012
     * @returns {object} Object with data and periods
     */
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
    /**
     * Gets the current schedule
     * @returns {object} Object with data and periods
     */
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


/**
 * @typedef Printout
 * @property {string} id
 * @property {string} url
 * @example
 *  {
 *    id: 22,
 *    url: "/trays/printable"
 *  }
 *
 */

/**
 * @class
 */
class printouts { //Printouts class
    /**
     * @returns {Promise<Printout[]>} Array of printouts
     */
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

/**
 * @typedef NewsItem
 * @property {string} id
 * @property {object} author
 * @property {string} description
 * @property {date} date Example: 21.10.2020
 * @property {number} type
 * @property {string} title
 * @example
 *  {
 *    id: 8,
 *    author: "Datanomi",
 *    description: null,
 *    date: "22.11.2025",
 *    type: 0,
 *    title: "Datanomi > Lukiolainen"
 *  }
 *
 */

/**
 * News
 * @class
 */
class news { //News class
    /**
     * @returns {Promise<NewsItem[]>} Array of news
     */
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


    /**
     * @param {string} id
     * @returns {Promise<NewsItem>}
     */
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

   /**
       * @class
       */
class schools {
      /**
     * @typedef School
     * @property {string} name Name of the school
     * @property {string} id Id of the school
     * @property {object} object Object of additional features. This can include: suomiFiMessages savedSearches attendaceSummary
     * @example
     *  {
     *    id: 8,
     *    name: "Lähiölän lukio",
     *    additionalFeatures: {
     *      attendanceSummary: false,
     *      savedSearches: true,
     *      suomiFiMessages: false
     *    }
     *  }
     *
     */

    /**
     * Lists all schools
    * @returns {Promise<School[]>} Array of {@link School}(s)
     * @see School
     */
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

    /**
     * @param {String} id Id of the school. You can get the id from {@link getAll}
     * @returns {School} {@link School}
     * @see School
     */
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
/**
 * Main class for everything
 */
class OpenWilma {
    /**
     *
     * @param {WilmaOptions} options Options for wilma
     */
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


        /**
         * @type {Object}
         * @readonly
         * {@link schools}
         */
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
     * @protected
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
     * Login to a Wilma server
     * @param {String} server The Wilma server url
     * @param {String} username The username of the Wilma account
     * @param {String} password The password of the Wilma account
     * @param {Boolean} validateServer If the server should be validated or not
     * @returns Promise()
     */
    async login(server, username, password, validateServer){ //Login to wilma
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
                        if(found == false && (validateServer != false || validateServer == undefined)){
                            reject("No such Wilma server available.")
                        }else {
                            if(validateServer == false && memory.session.server == null){
                                // bypassing server validation
                                memory.session.server = server;
                                memory.session.serverName = 'Unknown Server';
                            }
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
                                                                memory.session.token = res2[1].cookies.Wilma2SID.value
                                                                //Get the secret and formkey
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
                                                                        resolve()
                                                                    }).catch(async err => {
                                                                        reject(err)
                                                                    })
                                                                }).catch(async err => {
                                                                    reject(err)
                                                                })
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
                    }
                })
            }
            catch(err){
                reject(err)
            }
        })
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
