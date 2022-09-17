interface WilmaRole {
    name: string,
    type: string,
    id: string,
    isDefault: boolean,
    slug: string,
    secret: null
}

interface WilmaSession {
    account: {
        id: string | null,
        firstname: string | null,
        lastname: string | null,
        username: string,
        lastLogin: Date | null,
    },
    roles: WilmaRole[],
    session: {
        id: string,
        url: string,
        slug: string
    },
    flags: string[]
}

interface SessionOptions {
    url: string,
    username: string,
    password: string,
    validateServer?: boolean,
    flags?: []
}