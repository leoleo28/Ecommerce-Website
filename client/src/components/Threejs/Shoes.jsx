import React from "react";
import styled from "styled-components";
import Rating from "@material-ui/lab/Rating";
import ShoesItem from "./ShoesItem";
const Container = styled.div`
  height: 90vh;
  width: 100vw;
  display: flex;
  background: radial-gradient(#cc6666, #ff9966);
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  gap: 25px;
`;

const Right = styled.div`
  flex: 1;
`;

const Price = styled.div`
  font-size: 24px;
`;

const Name = styled.h1``;

const Desription = styled.p``;

const Shoes = () => {
  return (
    <Container>
      <Left>
        <Price>$250</Price>
        <Name>Air Jordan 5</Name>
        <Name>Retro "Bred 2023 Release"</Name>
        <Rating
          name="Rating Label"
          value={5}
          size="large"
          precision={0.5}
          readOnly
        />
        <Desription>
          The Air Jordan 5 "Bred" is One Of A Handful Of Realease
          <br />
          Taking Place During 2023 That Will Help Celebrate
          <br />
          The 30th Anniversary Of The Air Jordan
        </Desription>
        <Desription>
          Widely recognized as a fan-favorite, the two-toned
          <br />
          “Black/White” color scheme officially returns to
          <br />
          Jordan Brand’s Air Jordan 1 High 85 model
        </Desription>
      </Left>
      <Right>
        <ShoesItem />
      </Right>
    </Container>
  );
};

export default Shoes;
