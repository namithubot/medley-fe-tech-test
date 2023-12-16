import styled from "styled-components";

export const TableTitle = styled.h3 `
    border-left: 1rem solid #999dff;
    padding-left: 1rem;
    border-radius: 0.25rem;
`;

export const StyledTable = styled.table `
  width: 100%;

  tbody tr {
    height: 2rem;
    &:nth-child(odd) {
      background-color: #f8f8f8;
    }
  }
`;