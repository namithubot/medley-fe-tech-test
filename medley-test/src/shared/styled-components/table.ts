import styled from "styled-components";

/**
 * Table title component that prvides a left block
 * and a large title with h3.
 */
export const TableTitle = styled.h3 `
    border-left: 1rem solid #999dff;
    padding-left: 1rem;
    border-radius: 0.25rem;
`;

/**
 * Styled table component.
 * This has some default styling done to the rows and header.
 */
export const StyledTable = styled.table< { $columnWidth?: number } > `
  width: 100%;

  td {
	text-align: center;
	width: ${props => props?.$columnWidth ?? 'fit-content' }
  }

  thead tr {
	color: darkgray;
  }

  tbody tr {
    height: 2rem;
	font-weight: 500;
    &:nth-child(odd) {
      background-color: #f8f8f8;
    }
  }
`;