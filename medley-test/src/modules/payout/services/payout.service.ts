import { Payout } from "../models/payout";
import { PayoutResponse } from "../models/payout.response";

/**
 * Searches of a payout by a search term.
 * @param {string[]} searchString Query term to be searched with
 * @returns {Payout[]} List of the payouts matching the term.
 */
export async function searchPayout(searchString: string): Promise<Payout[]> {
    if (!searchString) {
        console.error('No Search input provided');
    }

    const response = await fetch(`https://theseus-staging.lithium.ventures/api/v1/analytics/tech-test/search?query=${searchString}`, {
        method: "GET",
    }).catch(error => {
        console.error(error);
    });
    const res = await response?.json();
    return (res as any[]).map(trasformResponseToPayout);
}

/**
 * Gets payout history.
 * @param page The page number it should fetch.
 * @param limit Maximum number of entries in one page allowed.
 * @returns {Payout[]} List of the payouts.
 */
export async function getPayouts(page: number, limit: number): Promise<PayoutResponse> {
    const response = await fetch(
        `https://theseus-staging.lithium.ventures/api/v1/analytics/tech-test/payouts?page=${page}&limit=${limit}`,
        {
            method: "GET",
        }).catch(error => {
            console.error(error);
        });;
    const res = await response?.json();

    return transformPagedResponse(res);
}

/**
 * Transforms the API response to UI data structure for paginated payout response.
 * @param response Payout response containing payouts and pagination data
 * @returns Payout Response in typed format.
 */
function transformPagedResponse(response: any): PayoutResponse {
    return {
        payouts: response.data.map(trasformResponseToPayout),
        pageData: response.metadata
    };
}

/**
 * Transforms Payout from API contract to UI data structure.
 * @param response Response containing payout data
 * @returns Payout data structure in Typed format.
 */
function trasformResponseToPayout(response: any): Payout {
    return {
        dateAndTime: new Date(response.dateAndTime),
        status: response.status,
        username: response.username,
        value: response.value
    }
}
