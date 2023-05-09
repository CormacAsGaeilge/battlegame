import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PlayerService } from "../../../../services/dynamoDb/player";
import { SQSPublisher } from "../../../../services/sqs";

const playerService = new PlayerService();
const sqsPublisher = new SQSPublisher();

const postBattle = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const playerId = event.pathParameters?.uuid;

    if (!playerId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Player ID is required" }),
      };
    }

    if (!event.body) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Battle payload is required" }),
        };
    }

    const { opponentUUID } = JSON.parse(event.body);

    if (!opponentUUID) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "opponentUUID is required" }),
        };
    }

    await sqsPublisher.publish({
        playerId,
        opponentUUID,
        timestamp: new Date().getTime()
    });


    return {
      statusCode: 200,
      body: "Battle Submitted",
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

module.exports.handler = postBattle;