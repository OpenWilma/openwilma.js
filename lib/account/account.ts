import ExamManager from "./managers/exams"
import { WilmaSession } from "../types"

class WilmaAccount {
	session: WilmaSession

    exams: ExamManager

    constructor(session: WilmaSession) {
        this.session = session

        this.exams = new ExamManager(this.session)
    }
}

export default WilmaAccount