import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: #3cb371;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Announcement = () => {
  return <Container>MEN'S LATEST FASHION SALE</Container>;
};

export default Announcement;
