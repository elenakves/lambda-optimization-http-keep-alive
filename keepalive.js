const AWS = require('aws-sdk');
const https = require('https');
const ssl = new https.Agent({
  keepAlive: true,
  maxSocket: 50,
  rejectUnauthorized: true
});
ssl.setMaxListeners(0);
AWS.config.update({
  httpOptions: {
    agent: ssl
  }
});

const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.matricula = async (event, context) => {
  var res;
  const start = new Date().getTime();
  switch (event.httpMethod) {
    case 'PUT': res = await dynamo.put({
      TableName: process.env.TABLE,
      Item: {
        Matricula: event.pathParameters.id
      }
    }).promise();
      break;
    case 'GET':
      for(var x = 0; x < 10; x++){
        res = await dynamo.get({
          TableName: process.env.TABLE,
          Key: {
            Matricula: event.pathParameters.id
          }
        }).promise();
      }
  }
  const end = new Date().getTime();
  console.log(`${event.httpMethod} - ${JSON.stringify(event.queryStringParameters)}: ${end - start}`);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `${event.httpMethod} - ${JSON.stringify(event.queryStringParameters)}: ${end - start}`,
      input: res
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
