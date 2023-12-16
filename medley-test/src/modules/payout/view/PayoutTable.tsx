import React, {useEffect, useState } from 'react';
import './PayoutTable.css';
import {Payout} from "../models/payout";
import {getPayouts} from "../services/payout.service";
import { PayoutStatus } from '../models/status.enum';
import { StyledTable, TableTitle } from '../../../shared/styled-components/table';
import { PageTitle, PageContent } from '../../../shared/styled-components/page';
import { Tag } from '../../../shared/styled-components/tag';

function PayoutTable() {
    const [payouts, setPayouts] = useState<Payout[]>([]);
    
    useEffect(() => {
        async function getAllPayouts() {
            const allPayouts = await getPayouts();
            setPayouts(allPayouts);
        }

        getAllPayouts();
    }, []);
    
  return (
    <div className="payout">
      <PageTitle className="payout-header">
        Payouts
      </PageTitle>
      <PageContent> 
        <TableTitle> Payout History </TableTitle>
        <StyledTable>
            <thead>
              <tr>
                <td>Date & Time</td>
                <td>Status</td>
                <td>Value</td>
              </tr>
            </thead>
            <tbody>
              {
                payouts.map((payout, i) => (
                  <tr key={i}>
                    <td>{payout.dateAndTime.toLocaleDateString() + ' '}
                    { payout.status === PayoutStatus.PENDING ? payout.dateAndTime.toLocaleTimeString() : '' }</td>
                    <td> <Tag className={payout.status === PayoutStatus.PENDING ? 'inactive' : 'active'}>{payout.status}</Tag></td>
                    <td> {payout.value} </td>
                  </tr>
                ))
              }
            </tbody>
        </StyledTable>
      </PageContent>
    </div>
  );
}

export default PayoutTable;
