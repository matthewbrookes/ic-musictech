import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import moment from "moment";

import Event from "../../components/Event/Event.jsx";

const Header = styled.h2``;

const EventDeleteButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const EventWrapper = styled.div`
  width: 90%;
`;

const ButtonWrapper = styled.div`
  height: 30px;
`;

class AdminEvents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
    };

    if (process.env.NODE_ENV === "development") {
      this.serverHost = "localhost";
    } else {
      this.serverHost = props.serverHost;
    }

    this.deleteEvent = this.deleteEvent.bind(this);
    this.fetchEvents = this.fetchEvents.bind(this);
  }

  deleteEvent(id) {
    const component = this;
    fetch(`http://${this.serverHost}:8080/events/${id}`, {
      method: "DELETE"
    }).then(function() {
      component.fetchEvents();
    });
  }

  fetchEvents() {
    let component = this;
    fetch(`http://${component.serverHost}:8080/events/`)
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
        <Header>Add a new event or delete old ones</Header>
        {this.state.events.map((event) => (
          <EventDeleteButtonWrapper key={event.id}>
            <EventWrapper>
              <Event event={event}/>
            </EventWrapper>
            <ButtonWrapper>
              <button onClick={() => this.deleteEvent(event.id)}>Delete</button>
            </ButtonWrapper>
          </EventDeleteButtonWrapper>
        ))}
      </div>
    );
  }
}

AdminEvents.propTypes = {
  serverHost: PropTypes.string.isRequired,
};

export default AdminEvents;
