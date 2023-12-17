import React, { useEffect, useState } from "react";
import "./PayoutTable.css";
import { Payout } from "../models/payout";
import { getPayouts, searchPayout } from "../services/payout.service";
import { TableTitle } from "../../../shared/styled-components/table";
import { PageTitle, PageContent } from "../../../shared/styled-components/page";
import { Button, InputFlat, Selector } from "../../../shared/styled-components/form";
import styled from "styled-components";
import DataTable from "./DataTable/DataTable";

/**
 * Payout table component.
 * @returns React component for the payout table.
 */
function PayoutTable() {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(10);
  const [isSearching, setIsSearching] = useState<NodeJS.Timeout>();

  /**
   * Filters the payout with given query.
   * @param query Query for the filter criteria.
   */
  async function filterPayout(query: string) {
    clearTimeout(isSearching);

    // Wait for 1000 second and do a search API call.
    const timeoutId = setTimeout(async () => {
      try {
        if (query) {
          const filterdPayouts = await searchPayout(query);
          setPayouts(filterdPayouts);
        } else {
          const pagedPayouts = await getPayouts(page, limit);
          setPayouts(pagedPayouts.payouts);
          setTotalCount(pagedPayouts.pageData.totalCount);
        }
      } catch (e) {
        console.error(e);
      }
    }, 1000);

    setIsSearching(timeoutId);
  }

  /**
   * Gets the maximum number of page possible with the current
   * API and data state.
   * @returns A number representing the maximum page count.
   */
  function getMaxPageNumber() {
    return Math.floor(totalCount / limit) + (totalCount % limit ? 1 : 0);
  }

  useEffect(() => {
    async function getAllPayouts() {
      const pagedPayouts = await getPayouts(page, limit);
      setPayouts(pagedPayouts.payouts);
      setTotalCount(pagedPayouts.pageData.totalCount);
    }

    getAllPayouts();
  }, [page, limit]);

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
        {/** Pagination */}
        <span>
          <Button onClick={(_) => setPage(page - 1)} disabled={page === 1}>
            Prev
          </Button>
          {page} of {getMaxPageNumber()} With size
          <Selector
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </Selector>
          <Button
            onClick={(_) => setPage(page + 1)}
            disabled={page === getMaxPageNumber()}
          >
            Next
          </Button>
        </span>
        {/** The table containing the data. */}
        <DataTable payouts={payouts}></DataTable>
      </PageContent>
    </div>
  );
}

export default PayoutTable;
