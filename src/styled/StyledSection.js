import styled from "styled-components";

export const StyledSection = styled.section`
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  box-shadow: -3px 3px 21px -7px rgba(50, 51, 56, 0.57);
  padding: 10px;
  background-color: #4783b2a8;
  border-radius: 5px;
  width: 50%;
  @media only screen and (max-width: 900px) {
    width: 90%;
  }
`;

export default StyledSection;
