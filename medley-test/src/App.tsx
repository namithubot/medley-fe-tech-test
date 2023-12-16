import React from 'react';
import './App.css';
import PayoutTable from './modules/payout/view/PayoutTable';
import styled from 'styled-components';

const Wrapper = styled.div `
 background-color: #fcfcfc;
`;

function App() {
  return (
    <Wrapper>
      <PayoutTable />
    </Wrapper>
  );
}

export default App;
