import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { PlayerService } from "../../../../services/dynamoDb/player";
import { Response } from "../../../../models/response";

const playerService = new PlayerService();

const getPlayer = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {

    const players = await playerService.getLeaderboard();

    if (!players) {
      return new Response(404, JSON.stringify({ message: "players not found" })).toJSON();
    }

    return new Response(200, JSON.stringify(players)).toJSON();
  } catch (error) {
    console.error(error);
    return new Response(500, JSON.stringify({ message: "Internal server error" })).toJSON();
  }
};

module.exports.handler = getPlayer;