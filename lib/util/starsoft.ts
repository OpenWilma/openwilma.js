import apiRequest from "../net/apiRequest"
import {RequestResponse} from "../types/apiRequest"
import {WilmaServer} from "../types/starsoft"
import Errors from "./error"

const servers = async (): Promise<Array<WilmaServer>> => {
    const serversResponse: RequestResponse = await apiRequest.get({
        url: "https://www.starsoft.fi/wilmat/wilmat.json"
    })

    if (serversResponse.status !== 200) {
        throw new Errors.SAPIError(
            "Unexpected server response from Starsoft server list."
        )
    }

    return serversResponse.data.wilmat
}

export default servers