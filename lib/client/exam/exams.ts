/**
 * OpenWilma.JS Exams functionality
 * 
 * By: @Esinko
 */

import apiRequest from "../../net/apiRequest"
import { WilmaSession } from "../../types"
import Errors from "../../utils/error"
import { WilmaExam, AccountExams } from "../../types/exam"

export default class ExamManager{
    session: WilmaSession
    constructor(session: WilmaSession){
        this.session = session
    }

    async list(){
        try {
            // Get exams that have not yet concluded
            const comingExams = await apiRequest.get({
                session: this.session,
                endpoint: "/exams/calendar?printable"
            })
            const pastExams = await apiRequest.post({
                session: this.session,
                endpoint: "/exams/past",
                headers: [
                    {name: "Content-Type", value: "application/x-www-form-urlencoded"}
                ],
                body: {
                    formkey: this.session.formkey,
                    secret: this.session.secret
                },
                redirect: true
            })
            if(pastExams && comingExams){
                let exams: AccountExams = {
                    past: [],
                    current: []
                }
                console.log(pastExams)
                return
                if(pastExams.status == 403){
                    // No tests or permission denied
                }else {
                    // Got standardized exam response
                    console.log(pastExams)
                }
                if(comingExams.status != 200){
                    throw new Errors.WAPIServerError("Server returned an unexpected response to Exams list request.")
                }else {
                    // Got standardized exam response
                    console.log(comingExams)
                }

            }else {
                throw new Errors.WAPIServerError("Unexpected server response(s).")
            }
        }
        catch(err){
            throw new Errors.WAPIError(err)
        }
    }
}