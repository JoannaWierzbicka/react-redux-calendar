import styled from "styled-components";

export const StyledSection = styled.section`
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
  @media only screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

export default StyledSection;
