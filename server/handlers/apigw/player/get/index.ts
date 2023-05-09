import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { PlayerService } from "../../../../services/dynamoDb/player";
import { Response } from "../../../../models/response";

const playerService = new PlayerService();

const getPlayer = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const playerId = event.pathParameters?.uuid;

    if (!playerId) {
      return new Response(400, JSON.stringify({ message: "Player ID is required" })).toJSON();
    }

    const player = await playerService.getPlayerById(playerId);

    if (!player) {
      return new Response(404, JSON.stringify({ message: "Player not found" })).toJSON();
    }

    return new Response(200, JSON.stringify(player)).toJSON();
  } catch (error) {
    console.error(error);
    return new Response(500, JSON.stringify({ message: "Internal server error" })).toJSON();
  }
};

module.exports.handler = getPlayer;