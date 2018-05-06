import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Separator from "../Separator/Separator.jsx";

const SignupWrapper = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  margin: 0 auto;
  width: 80%;
`;

const SignupName = styled.h3`
  margin: 0px;
`;

const SignupDetail = styled.h5`
  margin: 0px;
`;

const Signup = ({ name, genre, partner, slot }) => {
  return (
    <div>
      <Separator />
      <SignupWrapper>
        <SignupName>{name}</SignupName>
        <SignupDetail>{slot}</SignupDetail>
        {partner && <SignupDetail>Partner: {partner} </SignupDetail>}
        <SignupDetail>{genre}</SignupDetail>
      </SignupWrapper>
    </div>
  );
};

Signup.propTypes = {
  name: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  partner: PropTypes.string.isRequired,
  slot: PropTypes.string.isRequired
};

export default Signup;
