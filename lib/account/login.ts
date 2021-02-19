import WilmaAccount from "./account"

export interface WilmaLoginOptions {
    username: string,
    password: string,
    server: string
}

const login = async (
    url: string, 
    options: WilmaLoginOptions
): Promise<WilmaAccount> => {
    // TODO
}

export default login
