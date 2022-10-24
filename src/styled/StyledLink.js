import styled from "styled-components";

export const StyledLink = styled.a`
  text-decoration: none;
  color: black;
  margin: 16px 8px;
  font-weight: 600;
  padding: 4px;
  &:hover {
    transition: 0.4s linear;
    background-color: #6995b6;
    border-radius: 5px;
  }
`;

export default StyledLink;
