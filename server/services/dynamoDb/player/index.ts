import { v4 as uuidv4 } from "uuid";
import { MAX_LUCK, MIN_LEVEL, MIN_LUCK, NEXT_LVL, Player, START_BASE_ATTACK, START_EXP, START_GOLD, START_HIT_POINTS } from "../../../models/player";

export class PlayerService {

    // fake db
  private players: Player[] = [
    {
      uuid: '23339d2a-d6d5-4181-8d6d-175e070539bb',
      name: 'Player 11',
      gold: 869229069,
      startBA: 70,
      startHP: 100,
      level: 21,
      experience: 0,
      currentBA: 0,
      currentHP: 0,
      luck: 0.004,
      totalStolenGold: 0,
      nextLvl: 0
    },
    {
      uuid: '83ebc977-00a1-40ed-8aab-e53385633043',
      name: 'Player 16',
      gold: 997256771,
      startBA: 70,
      startHP: 104,
      level: 25,
      experience: 0,
      currentBA: 0,
      currentHP: 0,
      luck: 0.006,
      totalStolenGold: 0,
      nextLvl: 0
    },
    {
      uuid: '8034cbd5-bc2c-4448-a92c-b8d4c75a137a',
      name: 'Player 12',
      gold: 845258248,
      startBA: 69,
      startHP: 95,
      level: 34,
      experience: 0,
      currentBA: 0,
      currentHP: 0,
      luck: 0.007,
      totalStolenGold: 0,
      nextLvl: 0
    },
    {
      uuid: '68c900a9-5703-43bc-9514-4184526f3300',
      name: 'Player 4',
      gold: 407055243,
      startBA: 68,
      startHP: 100,
      level: 19,
      experience: 0,
      currentBA: 0,
      currentHP: 0,
      luck: 0.005,
      totalStolenGold: 0,
      nextLvl: 0
    },
    {
      uuid: '77d53113-f256-4b0f-a7af-3f64add60493',
      name: 'Player 4',
      gold: 272056379,
      startBA: 67,
      startHP: 97,
      level: 27,
      experience: 0,
      currentBA: 0,
      currentHP: 0,
      luck: 0.005,
      totalStolenGold: 0,
      nextLvl: 0
    },
    {
      uuid: '7dabf7f9-0f0a-46f0-aa52-d806babd1779',
      name: 'Player 15',
      gold: 187743391,
      startBA: 72,
      startHP: 98,
      level: 30,
      experience: 0,
      currentBA: 0,
      currentHP: 0,
      luck: 0.004,
      totalStolenGold: 0,
      nextLvl: 0
    },
    {
      uuid: 'd6465039-5323-4902-9610-93b912c8a5aa',
      name: 'Player 12',
      gold: 74451745,
      startBA: 66,
      startHP: 101,
      level: 40,
      experience: 0,
      currentBA: 0,
      currentHP: 0,
      luck: 0.009,
      totalStolenGold: 0,
      nextLvl: 0
    },
    {
      uuid: '2eb1f69b-fa4c-4a6f-ad96-8d9428d97859',
      name: 'Player 4',
      gold: 489648538,
      startBA: 69,
      startHP: 102,
      level: 1,
      experience: 0,
      currentBA: 0,
      currentHP: 0,
      luck: 0.004,
      totalStolenGold: 0,
      nextLvl: 0
    },
    {
      uuid: '38a5adc5-77b8-4e17-9923-9a42c9053ea6',
      name: 'Player 1',
      gold: 752060157,
      startBA: 75,
      startHP: 95,
      level: 19,
      experience: 0,
      currentBA: 0,
      currentHP: 0,
      luck: 0.007,
      totalStolenGold: 0,
      nextLvl: 0
    },
    {
      uuid: '4451bf81-1616-4cf3-82e3-b2ed97888171',
      name: 'Player 9',
      gold: 82740054,
      startBA: 73,
      startHP: 101,
      level: 9,
      experience: 0,
      currentBA: 0,
      currentHP: 0,
      luck: 0.008,
      totalStolenGold: 0,
      nextLvl: 0
    }
  ];

    async getPlayerById(uuid: string): Promise<Player | null> {
        return this.players.find((player) => player.uuid === uuid) || null;
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
        this.players.push(newPlayer);
        return newPlayer;
    }

    private generateRandomLuck(): number {
        return MIN_LUCK + (Math.random() * MAX_LUCK); // random between 0.004 ande 0.009
    }
}
