const AWS = require('aws-sdk');

if (process.env.NODE_ENV == "production") {
  // Create tables in AWS
  AWS.config.update({
    region: "eu-west-1"
  });
} else {
  // Create tables in local development version
  AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
  });
}

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

var tables = [
  {
    TableName : "musictech-sessions",
    KeySchema: [
      { AttributeName: "name", KeyType: "HASH"},
      { AttributeName: "session-date", KeyType: "RANGE"}
    ],
    AttributeDefinitions: [
      { AttributeName: "name", AttributeType: "S" },
      { AttributeName: "session-date", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  },{
    TableName : "musictech-signups",
    KeySchema: [
      { AttributeName: "signup-id", KeyType: "HASH"}
    ],
    AttributeDefinitions: [
      { AttributeName: "signup-id", AttributeType: "N" }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  }
];

// Create tables in DB
tables.forEach(function (table) {
  dynamodb.createTable(table, function(err, data) {
    if (err) {
      console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
      if (table.TableName == "musictech-sessions") {
        var sampleSession = {
          TableName: "musictech-sessions",
          Item:{
            "name": "session",
            "session-date": "2018-01-01",
            "location": "Metric"
          }
        };

        // Create a session in table
        docClient.put(sampleSession, function(err, data) {
          if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
          } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
          }
        });
      }
    }
  });
})
