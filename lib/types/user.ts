
/**
 * User type
 */
export enum UserType {
    TEACHER=1,
    STUDENT,
    STAFF,
    GUARDIAN,
    WORKPLACE_INSTRUCTOR,
    MANAGEMENT,
    WILMA_ACCOUNT
}

/**
 * User details such as name, school, etc should be stored here.
 */
export class User {
    name: string|null
    type: UserType
    id: number
    school: string|null

    constructor(name: string | null, type: UserType, id: number, school: string | null) {
        this.name = name;
        this.type = type;
        this.id = id;
        this.school = school;
    }
}