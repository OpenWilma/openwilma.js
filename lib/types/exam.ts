/**
 * Typings for exams
 */

import { WilmaAccount } from "./account";

/**
 * Wilma Exam entity 
 */
export interface WilmaExam {
    date: Date,
    teacher: WilmaAccount
    info: string,
    description: string,
    grade: {
        number: string,
        description: string
    }
}

/**
 * Account exams list 
 */
export interface AccountExams {
    current: WilmaExam[],
    past: WilmaExam[]
}