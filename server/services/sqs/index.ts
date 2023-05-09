import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';

export class SQSPublisher {
    static REGION = 'us-east-1';
    static QUEUE_URL = '';

    private sqsClient: SQSClient;

    constructor() {
        this.sqsClient = new SQSClient({ region: SQSPublisher.REGION });
    }

    async publish(data: any) {
        const sendMessageCommand = new SendMessageCommand({
            QueueUrl: SQSPublisher.QUEUE_URL,
            MessageBody: JSON.stringify(data),
        });
      
        await this.sqsClient.send(sendMessageCommand);
    }
}