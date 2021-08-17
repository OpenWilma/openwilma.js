import {User, UserType} from "./user";

export class Profile extends User {
    slug: string | null
    classTeacher: string | null
    className: string

    constructor(name: string | null, type: UserType, id: number, school: string | null, slug: string | null, classTeacher: string | null, className: string) {
        super(name, type, id, school);
        this.slug = slug;
        this.classTeacher = classTeacher;
        this.className = className;
    }
}