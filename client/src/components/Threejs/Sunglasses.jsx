import React from "react";
import styled from "styled-components";
import Rating from "@material-ui/lab/Rating";
import SunglassesItem from "./SunglassesItem";
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
  padding: 20px;
`;

const Price = styled.div`
  font-size: 24px;
`;

const Name = styled.h1``;

const Desription = styled.p``;

const Subtittle = styled.span`
  font-size: 20x;
  font-weight: bold;
`;

const Sunglasses = () => {
  return (
    <Container>
      <Left>
        <Price>$163</Price>
        <Name>Ray Ban</Name>
        <Name>AVIATOR II TITANIUM</Name>
        <Rating
          name="Rating Label"
          value={5}
          size="large"
          precision={0.5}
          readOnly
        />
        <Desription>
          <Subtittle>DARK GRADUATED AREA</Subtittle> screens out
          <br />
          fierce overhead sunshine, minimizes reflected
          <br />
          glare from water, sand, or highway
        </Desription>
        <Desription>
          <Subtittle>Ray-Ban</Subtittle> in sturdy gold filled or smart
          <br />
          zylonite frames for men and women
          <br />
          cost less than a good hat!
        </Desription>
      </Left>
      <Right>
        <SunglassesItem />
      </Right>
    </Container>
  );
};

export default Sunglasses;
