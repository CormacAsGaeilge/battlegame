// src/handler.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { PlayerService } from "../../../../services/dynamoDb/player";

const playerService = new PlayerService();

const getPlayer = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const playerId = event.pathParameters?.id;

    if (!playerId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Player ID is required" }),
      };
    }

    const player = await playerService.getPlayerById(playerId);

    if (!player) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Player not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(player),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

module.exports.handler = getPlayer;