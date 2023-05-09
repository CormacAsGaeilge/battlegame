import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { PlayerService } from "../../../../services/dynamoDb/player";
import { Response } from "../../../../models/response";

const playerService = new PlayerService();

const postPlayer = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {

    if (!event.body) {
      return new Response(400, JSON.stringify({ message: "Player payload is required" })).toJSON();
    }

    const { name } = JSON.parse(event.body);

    if (!name) {
      return new Response(400, JSON.stringify({ message: "name is required" })).toJSON();
    }

    if (name.length>20) {
      return new Response(400, JSON.stringify({ message: "name must be less than 20 characters" })).toJSON();
    }
    
    const player = await playerService.createPlayer(name);

    if (!player) {
      return new Response(404, JSON.stringify({ message: "Player not found" })).toJSON();
    }
    return new Response(200, JSON.stringify(player)).toJSON();

  } catch (error) {
    console.error(error);
    return new Response(500, JSON.stringify({ message: "Internal server error" })).toJSON();
  }
};

module.exports.handler = postPlayer;