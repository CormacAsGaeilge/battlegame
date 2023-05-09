import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { PlayerService } from "../../../../services/dynamoDb/player";

const playerService = new PlayerService();

const postPlayer = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {

    if (!event.body) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Player payload is required" }),
        };
    }

    const { name } = JSON.parse(event.body);

    if (!name) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "name is required" }),
        };
    }

    if (name.length>20) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "name must be less than 20 characters" }),
        };
    }
    
    const player = await playerService.createPlayer(name);

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

module.exports.handler = postPlayer;