import { SQSHandler, SQSEvent } from 'aws-lambda';

const processBattleHandler: SQSHandler = async (event: SQSEvent): Promise<void> => {
  try {
    for (const record of event.Records) {
      const {opponentUUID, playerId, timestamp} = JSON.parse(record.body);

      console.log(`Process Battle: ${record.messageId}`, {opponentUUID, playerId, timestamp});


    }
  } catch (error) {
    console.error('Error processing battle:', error);
    throw error;
  }
};

module.exports.handler = processBattleHandler;