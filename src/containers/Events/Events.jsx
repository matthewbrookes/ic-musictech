import React from "react";
import styled from "styled-components";
import moment from "moment";

import Event from "../../components/Event/Event.jsx";

let serverHost;

if (process.env.NODE_ENV === "development") {
  serverHost = "localhost";
} else {
  serverHost = "production-ip";
}

const Header = styled.h2``;

class Events extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
    };

    this.fetchEvents = this.fetchEvents.bind(this);
  }

  fetchEvents() {
    let component = this;
    fetch(`http://${serverHost}:8080/events/`)
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        component.setState({
          events: json.map((event) => ({
            id: event.id,
            title: event.title,
            date: moment(event.date).format("Do MMMM YYYY"),
            description: event.description,
            image: event.image,
          }))
        });
      })
      .catch(function(err) {
        console.error(err);
      });
  }

  componentDidMount() {
    this.fetchEvents();
  }

  render() {
    return (
      <div>
        <Header>Our upcoming and recent events</Header>
        {this.state.events.map((event) => <Event event={event} key={event.id}/>)}
      </div>
    );
  }
}

export default Events;
