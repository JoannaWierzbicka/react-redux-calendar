import styled from "styled-components";

export const StyledUl = styled.ul`
  list-style-type: none;
  display: grid;
  justify-content: space-around;
  width: 50%;
  margin-top: 0;
  padding-inline-start: 0;
  @media only screen and (max-width: 900px) {
    margin-top: 10px;
  }
  @media only screen and (max-width: 750px) {
    width: 100%;
  }
`;

export default StyledUl;
