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

const Header = styled.h2``;

const Img = styled.img`
  width: 200px;
`;

const events = [
  {
    "title": "Good Form 009: House\\Techno\\DnB",
    "description": "Imperial Soundsystem DJs all night long",
    "date": "19/11/2017",
    "image": "https://scontent-lht6-1.xx.fbcdn.net/v/t31.0-8/23213334_10155148649867362_5281441382595542657_o.jpg?oh=2da0e66fdb69d58d38e178f0628f8334&oe=5A96F3CF"
  },
  {
    "title": "BPM: Halloween Special",
    "description": "Imperial Soundsystem is back with a special Reggaeton & Charts night for Halloween! " +
                   "Ghouls and ghosts will be out to play on this night, we expect you to wear your best costumes!",
    "date": "27/10/2017",
    "image": "https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/22540102_10155112286217362_8683392362821605950_n.jpg?oh=9f9bb15c46c0e92c8f11f6dad5b76bc1&oe=5A9D9527"
  },
  {
    "title": "Beit Me I'm Famous",
    "description": "For the very first time in the history of FiveSixEight, Metric and the Union Bar, Beit Me I’m Famous will bring to you a party inspired from the best nights in Ibiza.\
                    Cocktails all night long, dancers from 23:00 to midnight, courtesy of Culinary and Pole & Aerial societies.",
    "date": "13/10/2017",
    "image": "https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/22046529_679066958955983_1000145979094858459_n.jpg?oh=108989aff4b30b1fbd9d5e878c8caeea&oe=5AA25D9C"
  }
];

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

const Events = () => (
  <div>
    <Header>Our upcoming and recent events</Header>
    {events.map((event) => <Event event={event} />)}
  </div>
);

export default Events;
