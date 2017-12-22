import React from "react";
import styled from "styled-components";

import Event from "../../components/Event/Event.jsx"

const Intro = styled.p`
`;

const shows = [
  {
    "title": "IC Music Tech Showcase",
    "description": "Bringing a slice of vibrant electronic music to your ears, the format stays true to the original ethos here at Music Tech. " +
                   "We'll regularly have hand-picked DJs in the mix. We aim to keep the slots brief, giving a platform to showcase the very best of what they're mixing. " +
                   "Alongside this, our production showcase will focus on the newest tracks our members have been working on. " +
                   "The aim is to keep this fresh, reflecting the full spectrum of the UK electronic music scene.",
    "image": "http://i.imgur.com/NfMSms2h.jpg",
    "date": "Various times throughout the year"
  },
  {
    "title": "The Big Daddy Hour",
    "description": "Hear the latest, up and coming tunes from the world of music beyond the charts and delve into the underground world of electronica.",
    "date": "Thursday 19:00-20:00",
    "image": "https://scontent-lht6-1.xx.fbcdn.net/v/t31.0-8/23213334_10155148649867362_5281441382595542657_o.jpg?oh=2da0e66fdb69d58d38e178f0628f8334&oe=5A96F3CF"
  }, {
    "title": "The Little Sus Hour",
    "description": "",
    "date": "Thursday 18:00-19:00",
    "image": ""
  }, {
    "title": "Magic Blood with Sangre Voss",
    "description": "",
    "date": "Thursday 16:00-17:00",
    "image": ""
  }
];
const Radio = () => (
  <div>
    <Intro>
      Musictech host their own radio sessions and several of our Musictech DJs host their own radio shows on <a href="http://www.icradio.com/">IC Radio</a>.
      Listen to some of Musictech's past sessions <a href="http://www.icradio.com/shows/957/">here</a> and check out when to hear our DJs playing live below.
    </Intro>
    {shows.map((show) => <Event event={show} />)}
  </div>
);

export default Radio;
