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
    return (await api.get(`/premarket/tokens?search=${search}&limit=${limit}&offset=${offset}&sort_order=${sortOrder}&network=${network}`))
}

async function getTokenInfo(tokenAddr: string) {
    return (await api.get(`/premarket/token/${tokenAddr}`))
}

async function getOffers(
    tokenAddr: string,
    userAddr: string,
    collateral: string,
    filltype: string,
    is_buy: boolean,
    offset: number,
    limit: number
) {
    return (await api.get(`/premarket/offers/${tokenAddr}?userAddr=${userAddr}&collateral=${collateral}&filltype=${filltype}&is_buy=${is_buy}&offset=${offset}&limit=${limit}`))
}

async function getUserData(accountAddr: string) {
    return (await api.get(`/dashboard/userdata/${accountAddr}`))
}

async function getUserPremarketTokens(
    accountAddr: string,
    limit: number,
    offset: number,
    status: string,
) {
    return (await api.get(`/dashboard/premarket_tokens/${accountAddr}?limit=${limit}&offset=${offset}&status=${status}`))
}

async function getUserOffers(
    tokenAddr: string,
    accountAddr: string,
    offer_status: string,
    offer_type: string,
    offset: number,
    limit: number,
) {
    return (await api.get(`/dashboard/token_offers/${tokenAddr}?account_addr=${accountAddr}&offer_status=${offer_status}&offer_type=${offer_type}&offset=${offset}&limit=${limit}`))
}

async function getUserOffersData(
    tokenAddr: string,
    accountAddr: string,
    offer_status: string,
    offer_type: string,
    offset: number,
    limit: number,
) {
    return (await api.get(`/dashboard/offers/${tokenAddr}?account_addr=${accountAddr}&offer_status=${offer_status}&offer_type=${offer_type}&offset=${offset}&limit=${limit}`))
}

async function getTokenPrice(
    symbol: string
) {
    return (await api.get(`/price/get/${symbol}`))
}

async function getCrossChainTokens(chain: number) {
    return (await api.get(`/premarket/cc_tokens?chain=${chain}`))
}

const backendApi = {
    getPremarketTokens,
    getTokenInfo,
    getOffers,
    getUserData,
    getUserPremarketTokens,
    getUserOffers,
    getUserOffersData,
    getTokenPrice,
    getCrossChainTokens
}
export default backendApi;