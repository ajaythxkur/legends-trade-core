import axios from 'axios'
import { backendUrl } from "./env"

const api = axios.create({
    baseURL: `${backendUrl}`,
    headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${storage.get("jwt")}`
    },
});

async function getPremarketTokens(
    search: string,
    limit: number,
    offset: number,
    sortOrder: string,
    network: number,
) {
    return (await api.get(`${backendUrl}/premarket/tokens?search=${search}&limit=${limit}&offset=${offset}&sort_order=${sortOrder}&network=${network}`))
}

async function getTokenInfo(tokenAddr:string){
    return (await api.get(`${backendUrl}/premarket/token/${tokenAddr}`))
}





const backendApi = {
    getPremarketTokens,
    getTokenInfo
}
export default backendApi;