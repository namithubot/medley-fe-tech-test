import styled from "styled-components";

export const Tag = styled.span `
  border-radius: 0.25rem;
  padding: 0 0.5rem;
  &.active {
    background-color: #60ca57;
  }

  &.inactive {
    background-color: #c1c4c7;
  }
`;
