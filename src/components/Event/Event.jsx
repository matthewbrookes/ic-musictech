import React from "react";
import MediaQuery from 'react-responsive';
import styled from "styled-components";

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

const EventSeparator = styled.div`
  border-top: black;
  border-top-style: dotted;
  width: 75%;
  margin: 0 auto;
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

const Event = (event) => {
  return (
  <div>
  <EventSeparator />
  <EventWrapper>
    <MediaQuery query="(min-device-width: 1224px)">
      <Img src={event.event.image} />
      <DescriptionWrapper>
        <EventTitle>{event.event.title}</EventTitle>
        <EventDate>{event.event.date}</EventDate>
        <p>{event.event.description}</p>
      </DescriptionWrapper>
    </MediaQuery>
    <MediaQuery query="(max-device-width: 1224px)">
      <DescriptionWrapper>
        {event.event.image && <Img src={event.event.image} />}
        <EventTitle>{event.event.title}</EventTitle>
        <EventDate>{event.event.date}</EventDate>
        <p>{event.event.description}</p>
      </DescriptionWrapper>
    </MediaQuery>
  </EventWrapper>
  </div>
)}

export default Event;
