/**
 * Typings for exams
 */

import { WilmaGroup } from "./group";

/**
 * Wilma Exam entity 
 */
export interface WilmaExam {
    id: String,
    course: WilmaGroup, // TODO: Create this
    name: String,
    description: String,
    grade: String,
    date: Date
}