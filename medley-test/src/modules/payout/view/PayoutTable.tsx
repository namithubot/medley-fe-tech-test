import React, { useEffect, useState } from "react";
import "./PayoutTable.css";
import { Payout } from "../models/payout";
import { searchPayout } from "../services/payout.service";
import { PayoutStatus } from "../models/status.enum";
import {
  StyledTable,
  TableTitle,
} from "../../../shared/styled-components/table";
import { PageTitle, PageContent } from "../../../shared/styled-components/page";
import { Tag } from "../../../shared/styled-components/tag";
import { InputFlat } from "../../../shared/styled-components/form";

function PayoutTable() {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [searchString, setSearchString] = useState("");
  const [isSearching, setIsSearching] = useState<NodeJS.Timeout>();

  async function filterPayout(query: string) {
    setSearchString(query);
    clearTimeout(isSearching);

    // Wait for 1000 second and do a search API call.
    const timeoutId = setTimeout(async () => {
      try {
        const filterdPayouts = await searchPayout(searchString);
        setPayouts(filterdPayouts);
      } catch (e) {
        console.error(e);
      }
    }, 1000);

    setIsSearching(timeoutId);
  }

  useEffect(() => {
    async function getAllPayouts() {
      const allPayouts = await searchPayout('');
      setPayouts(allPayouts);
    }

    getAllPayouts();
  }, []);

  return (
    <div className="payout">
      <PageTitle className="payout-header">Payouts</PageTitle>
      <PageContent>
        <TableTitle> Payout History </TableTitle>
        <InputFlat
          type="text"
          onChange={(e) => filterPayout(e.target.value)}
          placeholder="Search.."
        />
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
            {payouts.map((payout, i) => (
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
            ))}
          </tbody>
        </StyledTable>
      </PageContent>
    </div>
  );
}

export default PayoutTable;
