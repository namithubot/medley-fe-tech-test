import React from "react";
import { Payout } from "../../models/payout";
import { StyledTable } from "../../../../shared/styled-components/table";
import { Tag } from "../../../../shared/styled-components/tag";
import { PayoutStatus } from "../../models/status.enum";

export default function DataTable(props: { payouts: Payout[] }) {
  const { payouts } = props;

  return (
    <StyledTable>
      <thead>
        <tr>
          <td>Date & Time</td>
          <td>Status</td>
          <td>Value</td>
          <td>Recipent</td>
        </tr>
      </thead>
      <tbody>
        {payouts?.length ? (
          payouts.map((payout, i) => (
            <tr key={i}>
              <td>
                {payout.dateAndTime.toLocaleDateString() + " "}
                {payout.status === PayoutStatus.PENDING
                  ? payout.dateAndTime.toLocaleTimeString()
                  : ""}
              </td>
              <td>
                {" "}
                <Tag
                  className={
                    payout.status === PayoutStatus.PENDING
                      ? "inactive"
                      : "active"
                  }
                >
                  {payout.status}
                </Tag>
              </td>
              <td> {payout.value} </td>
              <td> {payout.username} </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4}> No Record Found with the given criteria </td>
          </tr>
        )}
      </tbody>
    </StyledTable>
  );
}
