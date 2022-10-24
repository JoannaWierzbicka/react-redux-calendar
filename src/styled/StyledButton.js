import styled from "styled-components";

export const StyledButton = styled.button`
  border-radius: 4px;
  border: none;
  background-color: #86adcc;
  padding: 4px;
  cursor: pointer;
  &:hover {
    transition: 0.4s linear;
    background-color: #f97066;
    color: white;
  }
`;

export default StyledButton;
