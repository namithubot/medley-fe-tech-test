import {Payout} from "../models/payout";
import { PayoutStatus } from "../models/status.enum";

/**
 * Gets payout history.
 * @returns {Payout[]} List of the payouts.
 */
export async function getPayouts(): Promise<Payout[]> {
    const response = await fetch('https://theseus-staging.lithium.ventures/api/v1/analytics/tech-test/payouts', {
        method: "GET",
    });
    const res = await response.json();

    return res.data.map(trasformResponseToPayout);
}

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
    return await response.json();
}

function trasformResponseToPayout(response: any): Payout {
    return {
        dateAndTime: new Date(response.dateAndTime),
        status: response.status,
        username: response.username,
        value: response.value
    }
}