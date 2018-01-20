import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const Img = styled.img`
  height: 100%;
  width:  100%;
`;

const MainImgWrapper = styled.div`
  max-width: 400px;
  width: 100%;
  display: block;
  margin: 0 auto;
`;

const SecondaryImgWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  display: block;
  margin: 0 auto;
`;

const Home = () => (
  <Wrapper>
    <p>{"Join Musictech Imperial if you're interested in learning how to DJ or produce music. DJs can play at a number of live events over the course of their university career and producers can get help learning the theory behind making great music. It doesn't matter what type of music you are into, Musictech Imperial will show you how to make it or how to play it live in a club."}</p>
    <MainImgWrapper>
      <Img src="/images/good_form_sean_ilaria.jpg" />
    </MainImgWrapper>
    <SecondaryImgWrapper>
      <Img src="/images/kieran-francesco-harry.jpg" />
    </SecondaryImgWrapper>
  </Wrapper>
);

export default Home;
