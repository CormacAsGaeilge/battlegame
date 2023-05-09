import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PlayerService } from "../../../../services/dynamoDb/player";
import { SQSPublisher } from "../../../../services/sqs";
import { Response } from '../../../../models/response';

const playerService = new PlayerService();
const sqsPublisher = new SQSPublisher();

const postBattle = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const playerId = event.pathParameters?.uuid;

    if (!playerId) {
      return new Response(400, JSON.stringify({ message: "Player ID is required" })).toJSON();
    }

    if (!event.body) {
      return new Response(400, JSON.stringify({ message: "Battle payload is required" })).toJSON();
    }

    const { opponentUUID } = JSON.parse(event.body);

    if (!opponentUUID) {
      return new Response(400, JSON.stringify({ message: "opponentUUID is required" })).toJSON();
    }

    await sqsPublisher.publish({
        playerId,
        opponentUUID,
        timestamp: new Date().getTime()
    });


    return new Response(200,"Battle Submitted").toJSON();
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

module.exports.handler = postBattle;