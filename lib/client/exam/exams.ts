/**
 * OpenWilma.JS Exams functionality
 * 
 * By: @Esinko
 */

import apiRequest from "../../net/apiRequest"
import { WilmaSession } from "../../types"
import Errors from "../../utils/error"
import { WilmaExam } from "../../types/exam"
import { WilmaTeacher } from "../../types/teacher"

export default class ExamManager{
    session: WilmaSession
    constructor(session: WilmaSession){
        this.session = session
    }

    async list(){
        try {
            // Get exams that have not yet concluded
            const exams = await apiRequest.get({
                session: this.session,
                endpoint: "/overview"
            })
            if(exams.status == 200){
                let json = exams.data.Exams
                let built: WilmaExam[] = []
                for(let exam of json){
                    // Convert date
                    let date = new Date()
                    date.setFullYear(exam.Date.split("-")[0])
                    date.setMonth(exam.Date.split("-")[1])
                    date.setDate(exam.Date.split("-")[2])

                    // Convert teachers
                    let teachers: WilmaTeacher[] = []
                    for(let teacher of exam.Teachers){
                        teachers.push({
                            id: teacher.TeacherId,
                            name: teacher.TeacherName,
                            code: teacher.TeacherCode
                        })
                    }

                    // Build object
                    built.push({
                        id: exam.ExamId,
                        course: {
                            name: exam.Course,
                            id: exam.CourseId,
                            description: exam.CourseTitle,
                            teachers: teachers
                        },
                        name: exam.Name,
                        description: exam.Info,
                        grade: exam.grade != undefined ? exam.grade : null,
                        date: date
                    })
                }
                return built
            }else {
                throw new Errors.WAPIServerError(exams.data.error)
            }
        }
        catch(err){
            throw new Errors.WAPIError(err)
        }
    }
}