const AWSKeepAlive = require('aws-sdk');
const AWS = require('aws-sdk');
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
  console.log(`${event.httpMethod} - without keepalive: ${end - start}`);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `${event.httpMethod} - without keepalive:: ${end - start}`,
      input: res
    }),
  };
};
