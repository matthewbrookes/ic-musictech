import React from "react";
import styled from "styled-components";
import AWS from "aws-sdk";

import Separator from "../../components/Separator/Separator.jsx";
import SessionInfo from "../../components/SessionInfo/SessionInfo.jsx";

if (process.env.NODE_ENV === "production") {
  // Use AWS
  AWS.config.update({
    region: "eu-west-1"
  });
} else {
  // Use local development version
  AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: {
      accessKeyId: "AAAAAAAAAAAAAAAAAAAA",
      secretAccessKey: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    }
  });
}

const Wrapper = styled.div``;

class Signup extends React.Component {

  constructor() {
    super();
    this.state = {};
    this.fetchSession = this.fetchSession.bind(this);

    this.fetchSession();
  }

  fetchSession() {
    // Retrieve latest session from DB
    const docClient = new AWS.DynamoDB.DocumentClient();
    let component = this;

    var params = {
        TableName : "musictech-sessions",
        KeyConditionExpression: "#name = :session",
        ExpressionAttributeNames:{
          "#name": "name"
        },
        ExpressionAttributeValues: {
          ":session":"session"
        },
        Limit: 1,
        ScanIndexForward: false
    };

    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            component.setState({
              location: 'Metric',
              date: 'Next Monday'
            })
        } else {
            data.Items.forEach(function(item) {
              component.setState({
                location: item['location'],
                date: item['session-date'],
              });
            });
        }
    });
  }

  render() {
    return (
    <Wrapper>
      <p>Sign here</p>
      <Separator />
      <SessionInfo date={this.state.date} location={this.state.location} />
    </Wrapper>
    );
  }
}

export default Signup;
