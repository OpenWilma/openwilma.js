/**
 * OpenWilma.JS Messages functionality
 * 
 * By: @Esinko
 */

import apiRequest from "../../net/apiRequest"
import { WilmaSession } from "../../types"
import Errors from "../../utils/error"
import { WilmaMessage, WilmaMessageLocation } from "../../types/message"
import { WilmaProfile, WilmaRole, TypesConversion} from "../../types/profiles"

/**
 * Account messages manager class
 */
export default class MessageManager {
    session: WilmaSession
    categories: WilmaMessageLocation[]
    types: any
    typesConversion: TypesConversion
    constructor(session: WilmaSession) {
        this.session = session
        this.categories = [ // All available categories
            "archive",
            "drafts",
            "sent",
            "inbox"
        ]
        this.types = { // Account types
            "teacher": 1,
            "student": 2,
            "staff": 3,
            "guardian": 4,
            "workplace-instructor": 5,
            "management": 6,
            "generic": 7,
        }
        this.typesConversion = { // Convert odd api responses to standard types
            "r_guardian": "guardian"
        }
    }

    /**
     * List all messages in a specific category
     * @param {WilmaMessageLocation} category The message category
     */
    async list(category: WilmaMessageLocation): Promise<WilmaMessage[]>{
        try {
            if(this.categories.includes(category)) {
                let messages = await apiRequest.get({
                    session: this.session,
                    endpoint: "/messages/list" + (category === "inbox" ? "" : "/" + (category === "sent" ? "outbox" : category)) // The index category does not require a path & sent -> outbox
                })
                if(messages.status === 200) {
                    // Parse
                    let built: WilmaMessage[] = []
                    for(let message of messages.data.Messages) {
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
                        for(let key of Object.keys(this.types)) {
                            let key_: any = key // I hate this
                            if(this.types[key_] === message.SenderType) {
                                type = key_
                            }
                        }
                        // Get code and class from author name
                        let code = null
                        let class_ = null
                        let name = message.Sender
                        if(name.includes("(") && name.endsWith(")")) {
                            // We have a code
                            code = name.split(" (")[1].replace(")", "")
                            name = name.replace(" " + code, "")
                        }
                        if(name.includes(", ")) {
                            class_ = name.split(", ")[1].trim()
                            name = name.split(", " + class_, "")
                        }

                        // Make author
                        let a: WilmaProfile = {
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
                } else {
                    throw new Errors.WAPIError("Unexpected response from Wilma server")
                }
            } else {
                throw new Errors.WAPIError("No such message category")
            }
        }
        catch(err) {
            throw new Errors.WAPIError(err)
        }
    }

    /**
     * List all available recipients
     */
    async listRecipients() {
        try {
            // Note: This list is incomplete! Some stuff may be missing, but these are all we can get. API limitations are the root cause.
            let recipients = await apiRequest.get({
                session: this.session,
                endpoint: "/messages/recipients/?select_recipients"
            })
            if(recipients.status === 200) {
                let built: WilmaProfile[] = []
                // Guardians
                if(recipients.data.GuardianRecords != undefined) {
                    for(let guardian of recipients.data.GuardianRecords) {
                        let role: WilmaRole = guardian.Role != undefined ? this.typesConversion[guardian.Role] : "generic"
                        built.push({
                            id: guardian.Id,
                            name: guardian.Caption,
                            role: role
                        })
                    }
                }

                // Complete list
                let handleProfile = async (data: any) => {
                    let ids: number[] = await data.SchoolIDs.split(",").map((i: string) => parseInt(i))
                    let name = data.Caption.split("(")[0].trimRight()
                    let code = data.Caption.split("(")[1].split(")")[0]
                    let role: WilmaRole = "unknown" // How could we get this?

                    // TODO: We need to query the profiles api here, to get more details!!

                    return {
                        id: data.Id,
                        name: name,
                        code: code,
                        schoolIds: ids,
                        role: role
                    }
                }
                for(let record of recipients.data.IndexRecords){
                    for(let ar in record){
                        if(Array.isArray(record[ar])){
                            for(let item of record[ar]){
                                built.push(await handleProfile(item))
                            }
                        }
                    }
                }
                console.log(built)
            } else {
                throw new Errors.WAPIError("Unexpected response server response")
            }
        }
        catch(err) {
            throw new Errors.WAPIError(err)
        }
    }

    /**
     * Get message by id
     */
    async get() {

    }

    /**
     * Create a new message draft
     */
    async create() {

    }

    /**
     * Send a message draft
     */
    async send() {

    }
}