import {Payout} from "../models/payout";

/**
 * Searches of a payout by a search term.
 * @param {string[]} searchString Query term to be searched with
 * @returns {Payout[]} List of the payouts matching the term.
 */
export async function searchPayout(searchString: string): Promise<Payout[]> {
    if (!searchString) {
        return getPayouts();
    }

    const response = await fetch(`https://theseus-staging.lithium.ventures/api/v1/analytics/tech-test/search?query=${searchString}`, {
        method: "GET",
    });
    const res = await response.json();
    return (res as any[]).map(trasformResponseToPayout);
}

/**
 * Gets payout history.
 * @returns {Payout[]} List of the payouts.
 */
async function getPayouts(): Promise<Payout[]> {
    const response = await fetch('https://theseus-staging.lithium.ventures/api/v1/analytics/tech-test/payouts', {
        method: "GET",
    });
    const res = await response.json();

    return res.data.map(trasformResponseToPayout);
}

function trasformResponseToPayout(response: any): Payout {
    return {
        dateAndTime: new Date(response.dateAndTime),
        status: response.status,
        username: response.username,
        value: response.value
    }
}