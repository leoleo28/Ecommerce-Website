import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Progress = () => {
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
};

export default Progress;
