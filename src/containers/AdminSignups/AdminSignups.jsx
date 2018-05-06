import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import moment from "moment";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Signup from "../../components/Signup/Signup.jsx";

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
  font-size: 16px;
`;

const Error = styled.div``;

const DatePickerWrapper = styled.div`
  width: 100%;
`;

const StyledDatePicker = styled(DatePicker)`
  font-size: 16px;
`;

class AdminSignups extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signups: [],
      sessionDate: moment(),
      sessionLocation: ""
    };

    if (process.env.NODE_ENV === "development") {
      this.serverHost = "localhost";
    } else {
      this.serverHost = props.serverHost;
    }

    this.fetchSignups = this.fetchSignups.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValidForm = this.isValidForm.bind(this);
  }

  handleDateChange(date) {
    this.setState({
      sessionDate: date
    });
  }

  handleLocationChange(e) {
    this.setState({
      sessionLocation: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const component = this;

    fetch(`http://${component.serverHost}:8080/create-session/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        location: component.state.sessionLocation,
        date: component.state.sessionDate.format("YYYY-MM-DD")
      })
    }).then(function(response) {
      if (response.status >= 200 && response.status < 300) {
        component.setState({
          error: "Success!",
          sessionDate: moment(),
          sessionLocation: ""
        });
        component.fetchSignups();
      } else {
        component.setState({ error: "An error occured" });
      }
    });
  }

  fetchSignups() {
    let component = this;
    fetch(`http://${component.serverHost}:8080/next-session/`)
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        fetch(`http://${component.serverHost}:8080/signups/${json.id}`)
          .then(function(data) {
            return data.json();
          })
          .then(function(signups) {
            component.setState({
              signups
            });
          })
          .catch(function(err) {
            console.error(err);
          });
      })
      .catch(function(err) {
        console.error(err);
      });
  }

  componentDidMount() {
    this.fetchSignups();
  }

  isValidForm() {
    return this.state.sessionLocation && this.state.sessionDate;
  }

  render() {
    return (
      <div>
        <Header>Add a new DJ session or view signups</Header>
        <FormWrapper>
          <form onSubmit={this.handleSubmit}>
            <LeftAlignWrapper>
              <Label for="date">Date: </Label>
            </LeftAlignWrapper>
            <DatePickerWrapper>
              <StyledDatePicker
                selected={this.state.sessionDate}
                onChange={this.handleDateChange}
                dateFormat="DD/MM/YYYY"
              />
            </DatePickerWrapper>
            <LeftAlignWrapper>
              <Label for="location">Location: </Label>
            </LeftAlignWrapper>
            <Input
              type="textarea"
              id="location"
              onChange={this.handleLocationChange}
              value={this.state.sessionLocation}
            />
            <button disabled={!this.isValidForm()}>Create Session</button>
            <Error>{this.state.error}</Error>
          </form>
        </FormWrapper>

        {this.state.signups.map(signup => (
          <Signup {...signup} key={signup.id} />
        ))}
      </div>
    );
  }
}

AdminSignups.propTypes = {
  serverHost: PropTypes.string.isRequired
};

export default AdminSignups;
