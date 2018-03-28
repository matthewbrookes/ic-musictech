import React from "react";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import styled from "styled-components";

import Separator from "../Separator/Separator.jsx";

const EventWrapper = styled.div`
  display: flex;
  padding: 10px;
`;

const EventTitle = styled.h3`
  margin: 0px;
`;

const EventDate = styled.h5`
  margin: 0px;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 80%;
`;

const Img = styled.img`
  max-width: 200px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const Event = ({ event }) => {
  return (
    <div>
      <Separator />
      <EventWrapper>
        <MediaQuery query="(min-device-width: 1224px)">
          <Img src={event.image} />
          <DescriptionWrapper>
            <EventTitle>{event.title}</EventTitle>
            <EventDate>{event.date}</EventDate>
            <p>{event.description}</p>
          </DescriptionWrapper>
        </MediaQuery>
        <MediaQuery query="(max-device-width: 1224px)">
          <DescriptionWrapper>
            {event.image && <Img src={event.image} />}
            <EventTitle>{event.title}</EventTitle>
            <EventDate>{event.date}</EventDate>
            <p>{event.description}</p>
          </DescriptionWrapper>
        </MediaQuery>
      </EventWrapper>
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  })
};

export default Event;
