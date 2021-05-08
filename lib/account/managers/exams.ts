import apiRequest from "../../net/apiRequest"
import Errors from "../../util/error"

import { WilmaSession } from "../../types"
import { WilmaExam } from "../../types/exam"
import { WilmaTeacher } from "../../types/teacher"


export default class ExamManager {
    session: WilmaSession

    constructor(session: WilmaSession){
        this.session = session
    }

    async list(): Promise<Array<WilmaExam>> {
        // Get exams that have not yet concluded
        const examsResponse = await apiRequest.get({
            session: this.session,
            endpoint: "/overview"
        })

        if (examsResponse.status !== 200) {
            throw new Errors.WAPIServerError(examsResponse.data.error)
        }

        const exams = examsResponse.data.Exams

        return exams.map((e: any) => {
            const {
                Teachers: jsonTeachers,
                Date: jsonDate,
            } = e

            const [ year, month, day ] = jsonDate.split("-")

            const date = new Date()
            date.setFullYear(year)
            date.setMonth(month)
            date.setDate(day)

            const teachers: Array<WilmaTeacher> = jsonTeachers
                .map((t: any) => ({
                    id: t.TeacherId,
                    name: t.TeacherName,
                    code: t.TeacherCode
                }))

            return {
                id: e.ExamId,
                course: {
                    name: e.Course,
                    id: e.CourseId,
                    description: e.CourseTitle,
                    teachers
                },
                name: e.Name,
                description: e.Info,
                grade: e.Grade ?? null,
                date: date
            }
        })
    }
}
