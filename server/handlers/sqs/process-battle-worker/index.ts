import { SQSHandler, SQSEvent } from 'aws-lambda';
import { PlayerService } from '../../../services/dynamoDb/player';
import { Player } from '../../../models/player';

const playerService = new PlayerService();

const processBattleHandler: SQSHandler = async (event: SQSEvent): Promise<void> => {
  try {
    for (const record of event.Records) {
      const {opponentUUID, playerId, timestamp} = JSON.parse(record.body);

      console.log(`Process Battle: ${record.messageId}`, {opponentUUID, playerId, timestamp});

      if (!playerId) {
        throw new Error("No PlayerId Found");
      }
      if (!opponentUUID) {
        throw new Error("No OpponentId Found");
      }
        // Get Player
      const player = await playerService.getPlayerById(playerId);
      // Get opponent
  
      const opponent = await playerService.getPlayerById(opponentUUID);

      if (!player) {
        throw new Error("No Player Found");
      }
      if (!opponent) {
        throw new Error("No Opponent Found");
      }
      // start battle
      let playersTurn: boolean = true;
      console.log("BATTLE BEGINS!");
      let attackPower = 0;
      let missedHit = false;
      while(player.currentHP > 0 && opponent.currentHP>0) {
        //play turn
        if(playersTurn) {
          // player's turn
          attackPower = calculateAttackPower(player);
          missedHit = Math.random() < opponent.luck;
          if(!missedHit) {
            opponent.currentHP -= attackPower;
            console.log(`HIT! Opponent took damage (-${attackPower}) Opponent HP - ${opponent.currentHP}`);
          } else {
            console.log("MISSED ATTACK!");
          }
        } else {
          //opponent's turn
          attackPower = calculateAttackPower(opponent);
          missedHit = Math.random() < player.luck;
          if(!missedHit) {
            player.currentHP -= attackPower;
            console.log(`HIT! Player took damage (-${attackPower}) Player HP - ${player.currentHP}`);
          } else {
            console.log("MISSED ATTACK!");
          }
        }
        //end turn
        playersTurn = !playersTurn;
      }
      console.log("BATTLE ENDS!");
      const goldYeild = 10 + (Math.random() * 10);
      if(player.currentHP <= 0) {
        //player losses
        const goldLost = player.gold*goldYeild;
        console.log(`DEFEAT! Player losses ${goldLost}`);
        opponent.gold = opponent.gold + goldLost;
        player.gold = player.gold - goldLost;
      } else {
        //opponent losses
        const goldWon = opponent.gold*goldYeild;
        console.log(`VICTORY! Player wins ${goldWon}`);
        player.gold = player.gold + goldWon;
        opponent.gold = opponent.gold - goldWon;
      }

    }
  } catch (error) {
    console.error('Error processing battle:', error);
    throw error;
  }
};


function calculateAttackPower(player: Player): number {
  const healthPercentage = Math.ceil((player.currentHP * 100) / player.startHP) / 100;
  console.log(healthPercentage);
  return (healthPercentage> 0.5) ? player.currentBA*healthPercentage: player.currentBA*0,5;
}

function attack(attacker:Player, defender: Player) {

}

module.exports.handler = processBattleHandler;