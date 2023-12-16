import {PayoutStatus} from "./status.enum";

/**
 * Model to denote a payout object.
 */
export interface Payout {
    /**
     * Date of the payout transaction initiation.
     */
    dateAndTime: Date;

    /**
     * A string indicating the status of the payout (Pending or Completed).
     */
    status: PayoutStatus;

    /**
     * The value of the payout.
     */
    value: string;

    /**
     * A string representing the username associated with the payout.
     */
    username: string;
}
