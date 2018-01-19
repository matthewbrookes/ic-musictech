import React from "react";
import styled from "styled-components";

import Separator from "../../components/Separator/Separator.jsx";
import SessionInfo from "../../components/SessionInfo/SessionInfo.jsx";


const Wrapper = styled.div``;

const Signup = () => (
  <Wrapper>
    <p>Signup here</p>
    <Separator />
    <SessionInfo date={"23/01/2018"} location={"Metric"} />
  </Wrapper>
);

export default Signup;
