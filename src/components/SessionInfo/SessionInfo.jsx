import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div``;

const H3 = styled.h3`
  margin-bottom: 0px;
`;

const H4 = styled.h4`
  margin: 5px;
`;

const SessionInfo = ({ date, location }) => {
  return (
    <Wrapper>
      <H3>{date}</H3>
      <H4>{location}</H4>
    </Wrapper>
  );
};

SessionInfo.propTypes = {
  date: PropTypes.string,
  location: PropTypes.string,
};

export default SessionInfo;
