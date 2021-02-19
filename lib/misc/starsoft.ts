import apiRequest from "../net/apiRequest"
import {RequestResponse} from "../types/apiRequest"
import {WilmaServer} from "../types"
import { SAPIError } from "../utils/error"

export const serverList = async (): Promise<WilmaServer[]> => {
    const response: RequestResponse = await apiRequest.get({
        url: "https://www.starsoft.fi/wilmat/wilmat.json"
    })

    console.log("runs")

    if (response.status === 200) {
        return response.data.wilmat
    } else {
        throw new SAPIError(`Starsoft API responded with ${response.status}`)
    }
}
