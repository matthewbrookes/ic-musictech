import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import moment from "moment";

import Event from "../../components/Event/Event.jsx";

const Header = styled.h2``;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 250px;
  margin: 0 auto;
  padding-bottom: 10px;
`;

const LeftAlignWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;

const Label = styled.label`
  align: left;
  font-size: 11px;
  color: #3e3e3e;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 90%;
`;

const Error = styled.div``;

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
      eventName: "",
      eventDate: "",
      eventDescription: "",
      eventImageUrl: "",
    };

    if (process.env.NODE_ENV === "development") {
      this.serverHost = "localhost";
    } else {
      this.serverHost = props.serverHost;
    }

    this.deleteEvent = this.deleteEvent.bind(this);
    this.fetchEvents = this.fetchEvents.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({
      eventName: e.target.value,
    });
  }

  handleDateChange(e) {
    this.setState({
      eventDate: e.target.value,
    });
  }

  handleDescriptionChange(e) {
    this.setState({
      eventDescription: e.target.value,
    });
  }

  handleUrlChange(e) {
    this.setState({
      eventImageUrl: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const component = this;
    if (this.state.eventDescription.length > 2000) {
      this.setState({
        error: `Description must be less than 2000 characters, currently ${this.state.eventDescription.length} characters`,
      });
      return;
    }

    fetch(`http://${component.serverHost}:8080/add-event/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: component.state.eventName,
        date: component.state.eventDate,
        description: component.state.eventDescription,
        image: component.state.eventImageUrl,
      })
    })
      .then(function(response) {
        if (response.status >= 200 && response.status < 300) {
          component.setState({ error: "Success!" });
          component.fetchEvents();
        } else {
          component.setState({ error: "An error occured" });
        }
      });
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
        <FormWrapper>
          <form onSubmit={this.handleSubmit}>
            <LeftAlignWrapper>
              <Label for="eventname">Event Name: </Label>
            </LeftAlignWrapper>
            <Input type="text" id="eventname" onChange={this.handleNameChange} required />
            <LeftAlignWrapper>
              <Label for="date">Date: </Label>
            </LeftAlignWrapper>
            <Input type="text" id="date" onChange={this.handleDateChange} required />
            <LeftAlignWrapper>
              <Label for="description">Description: </Label>
            </LeftAlignWrapper>
            <Input type="textarea" id="description" onChange={this.handleDescriptionChange} required />
            <LeftAlignWrapper>
              <Label for="url">Image url: </Label>
            </LeftAlignWrapper>
            <Input type="text" id="url" onChange={this.handleUrlChange} required />
            <button>Create Event</button>
            <Error>{this.state.error}</Error>
          </form>
        </FormWrapper>

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
