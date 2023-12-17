import { PaginationMeta } from "./pagination";
import { Payout } from "./payout";
import {PayoutStatus} from "./status.enum";

/**
 * Model to denote a payout response object.
 */
export interface PayoutResponse {
    /**
     * Payout data.
     */
    payouts: Payout[];

    /**
     * Page meta data.
     */
    pageData: PaginationMeta;
}
