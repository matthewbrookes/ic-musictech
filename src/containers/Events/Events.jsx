import React from "react";
import styled from "styled-components";

import Event from "../../components/Event/Event.jsx"

const Header = styled.h2``;

const events = [
  {
    "title": "Good Form 009: House\\Techno\\DnB",
    "description": "Imperial Soundsystem DJs all night long",
    "date": "17/11/2017",
    "image": "/images/event-photos/good-form-17-11-17.jpg"
  },
  {
    "title": "BPM: Halloween Special",
    "description": "Imperial Soundsystem is back with a special Reggaeton & Charts night for Halloween! " +
                   "Ghouls and ghosts will be out to play on this night, we expect you to wear your best costumes!",
    "date": "27/10/2017",
    "image": "/images/event-photos/bpm-halloween.jpg"
  },
  {
    "title": "Beit Me I'm Famous",
    "description": "For the very first time in the history of FiveSixEight, Metric and the Union Bar, Beit Me I’m Famous will bring to you a party inspired from the best nights in Ibiza." +
                    "Cocktails all night long, dancers from 23:00 to midnight, courtesy of Culinary and Pole & Aerial societies.",
    "date": "13/10/2017",
    "image": "/images/event-photos/bmif.jpg"
  }
];


const Events = () => (
  <div>
    <Header>Our upcoming and recent events</Header>
    {events.map((event) => <Event event={event} />)}
  </div>
);

export default Events;
