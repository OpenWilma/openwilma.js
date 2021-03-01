/**
 * OpenWilma.JS Messages functionality
 * 
 * By: @Esinko
 */

import apiRequest from "../../net/apiRequest"
import { WilmaSession } from "../../types"
import Errors from "../../utils/error"
import { WilmaMessage, WilmaMessageLocation } from "../../types/message"
import { WilmaAccount, WilmaRole } from "../../types/account"

/**
 * Account messages manager class
 */
export default class MessageManager {
    session: WilmaSession
    categories: WilmaMessageLocation[]
    types: any
    constructor(session: WilmaSession){
        this.session = session
        this.categories = [ // All available categories
            "archive",
            "drafts",
            "sent",
            "inbox"
        ]
        this.types = {
            "teacher": 1,
            "student": 2,
            "staff": 3,
            "parent": 4,
            "workplace-instructor": 5,
            "management": 6,
            "generic": 7,
        }
    }

    /**
     * List all messages in a specific category
     * @param {WilmaMessageLocation} category The message category
     */
    async list(category: WilmaMessageLocation): Promise<WilmaMessage[]>{
        try {
            if(this.categories.includes(category)){
                let messages = await apiRequest.get({
                    session: this.session,
                    endpoint: "/messages/list" + (category == "inbox" ? "" : "/" + (category == "sent" ? "outbox" : category)) // The index category does not require a path & sent -> outbox
                })
                if(messages.status == 200){
                    // Parse
                    let built: WilmaMessage[] = []
                    for(let message of messages.data.Messages){
                        // Skip appointments
                        if(message.IsEvent === true) continue
                        // Construct date
                        let date = new Date()
                        let d = message.TimeStamp.split(" ")[0].split("-")
                        let t = message.TimeStamp.split(" ")[1].split(":")
                        date.setFullYear(d[0])
                        date.setMonth(d[1])
                        date.setDate(d[2])
                        date.setHours(t[0])
                        date.setMinutes(t[1])

                        // Convert author type
                        let type: WilmaRole = "generic"
                        for(let key of Object.keys(this.types)){
                            let key_: any = key // I hate this
                            if(this.types[key_] == message.SenderType){
                                type = key_
                            }
                        }
                        // Get code and class from author name
                        let code = null
                        let class_ = null
                        let name = message.Sender
                        if(name.includes("(") && name.endsWith(")")){
                            // We have a code
                            code = name.split(" (")[1].replace(")", "")
                            name = name.replace(" " + code, "")
                        }
                        if(name.includes(", ")){
                            class_ = name.split(", ")[1].trim()
                            name = name.split(", " + class_, "")
                        }

                        // Make author
                        let a: WilmaAccount = {
                            id: message.SenderId,
                            role: type,
                            name: name,
                            code: code,
                            class: class_ // This should always be null as students can't really message each other...
                        }   

                        built.push({
                            id: message.Id,
                            title: message.Subject,
                            timestamp: date,
                            location: message.Folder,
                            author: a
                        })
                    }
                    return built
                }else {
                    throw new Errors.WAPIError("Unexpected response from Wilma server")
                }
            }else {
                throw new Errors.WAPIError("No such message category")
            }
        }
        catch(err){
            throw new Errors.WAPIError(err)
        }
    }

    /**
     * List all available recipients
     */
    async listRecipients(){
        try {
            // Note: This list is incomplete! Some stuff may be missing, but these are all we can get. API limitations are the root cause.
            let recipients = await apiRequest.get({
                session: this.session,
                endpoint: "/messages/recipients/?select_recipients"
            })
            if(recipients.status == 200){
                let built: WilmaAccount[] = []
                // Guardians
                if(recipients.data.GuardianRecords != undefined){
                    for(let guardian of recipients.data.GuardianRecords){
                        // TODO
                        built.push({
                            id: guardian.Id,
                            name: guardian.Caption,
                            role: 
                        })
                    }
                }
            }else {
                throw new Errors.WAPIError("Unexpected response server response")
            }
        }
        catch(err){
            throw new Errors.WAPIError(err)
        }
    }

    /**
     * Get message by id
     */
    async get(){

    }

    /**
     * Create a new message draft
     */
    async create(){

    }

    /**
     * Send a message draft
     */
    async send(){

    }
}