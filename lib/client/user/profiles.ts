/**
 * OpenWilma.JS Profile manager
 * 
 * By: @Esinko
 */

import apiRequest from "../../net/apiRequest"
import { WilmaSession } from "../../types"
import { WilmaAccount, WilmaRole } from "../../types/account"
import Errors from "../../utils/error"

export default class ProfileManager {
    session: WilmaSession
    constructor(session: WilmaSession){
        this.session = session
    }

    /**
     * List all profiles
     */
    async list(){

    }

    /**
     * Get profile information
     * @param type The profile type
     * @param id The profile id
     */
    async get(type: WilmaRole, id: string){
        try {
            // Convert to numbers
            let con: any = {
                "teacher": "teachers",
                "student": "students",
                "staff": "personnel"
            }
            if(con[type] == undefined){
                throw new Errors.WAPIError("This API does not support that role")
            }else {
                // Now we know we are looking for actual people and not rooms or items
                apiRequest.get({
                    session: this.session
                })
            }
        }
        catch(err){
            throw new Errors.WAPIError(err)
        }
    }
}