import { v4 as uuidv4 } from "uuid";
import { MAX_LUCK, MIN_LEVEL, MIN_LUCK, NEXT_LVL, Player, START_BASE_ATTACK, START_EXP, START_GOLD, START_HIT_POINTS } from "../../../models/player";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

export class PlayerService {
  static REGION = 'us-east-1';
  static TABLE_NAME = 'PlayerTable';

  private dynamoDBClient = new DynamoDBClient({ region: PlayerService.REGION });
  private client = DynamoDBDocumentClient.from(this.dynamoDBClient);

    async getPlayerById(uuid: string): Promise<Player | null> {
      const result = await this.client.send(new GetCommand({
        TableName: PlayerService.TABLE_NAME,
        Key: {
          uuid
        }
      }));

      return result.Item ? (result.Item as Player) : null;
    }

  
     async createPlayer(name: any): Promise<Player> {
        const newPlayer: Player = {
            uuid: uuidv4(),
            name: name,
            gold: START_GOLD,
            startBA: START_BASE_ATTACK,
            startHP: START_HIT_POINTS,
            level: MIN_LEVEL,
            experience: START_EXP,
            currentBA: START_BASE_ATTACK,
            currentHP: START_HIT_POINTS,
            luck: this.generateRandomLuck(),
            totalStolenGold: START_GOLD,
            nextLvl: NEXT_LVL
        };
        
        await this.client.send(new PutCommand({
          TableName: PlayerService.TABLE_NAME,
          Item: newPlayer
        }));
        return newPlayer;
    }
    
    async updatePlayer(player: Player) {
      await this.client.send(new PutCommand({
        TableName: PlayerService.TABLE_NAME,
        Item: player
      }));
    return player;
    }

    
    async getLeaderboard(): Promise<Player[]> {
      const result = await this.client.send(new QueryCommand({
        TableName: PlayerService.TABLE_NAME,
        IndexName: 'TotalStolenGoldIndex',
        KeyConditionExpression: 'uuid = :uuid',
        ExpressionAttributeValues: {
          ':uuid': { S: 'ANY_STRING' },
        },
        ScanIndexForward: false,
        Limit: 10,
      }));

      return result.Items?.map((item) => {
        return {
          uuid: item.uuid.S!,
          name: item.name.S!,
          gold: Number(item.gold.N),
          startBA: Number(item.startBA.N),
          startHP: Number(item.startHP.N),
          level: Number(item.level.N),
          experience: Number(item.experience.N),
          nextLvl: Number(item.nextLvl.N),
          currentBA: Number(item.currentBA.N),
          currentHP: Number(item.currentHP.N),
          luck: Number(item.luck.N),
          totalStolenGold: Number(item.totalStolenGold.N),
        };
      }) || [];
  }

    private generateRandomLuck(): number {
        return MIN_LUCK + (Math.random() * (MAX_LUCK - MIN_LUCK)); // random between 0.004 ande 0.009
    }
}
