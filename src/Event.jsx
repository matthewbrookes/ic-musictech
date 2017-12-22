import React from "react";
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
  width: 80%;
`;

const Img = styled.img`
  width: 200px;
`;

const Event = (event) => {
  return (
  <div>
  <EventSeparator />
  <EventWrapper>
    <Img src={event.event.image} />
    <DescriptionWrapper>
      <EventTitle>{event.event.title}</EventTitle>
      <EventDate>{event.event.date}</EventDate>
      <p>{event.event.description}</p>
    </DescriptionWrapper>
  </EventWrapper>
  </div>
)}

export default Event;
