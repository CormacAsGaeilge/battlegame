import { SendMessageCommand, SQSClient, GetQueueUrlCommand  } from '@aws-sdk/client-sqs';

export class SQSPublisher {
    static REGION = 'us-east-1';
    static QUEUE_NAME = `battles-queue`;

    private sqsClient: SQSClient;
    private queueUrl?: string;

    constructor() {
        this.sqsClient = new SQSClient({ region: SQSPublisher.REGION });
    }

    async init() {
        try {
            const command = new GetQueueUrlCommand({ QueueName: SQSPublisher.QUEUE_NAME });
            const response = await this.sqsClient.send(command);
            if(!response.QueueUrl)
                throw new Error("No QueueUrl found");
            
            this.queueUrl = response.QueueUrl;
            console.log(`Initialised Queue. URL: ${this.queueUrl}`);
        } catch (error) {
            console.error('Error fetching Queue URL:', error);
        }
    }

    async publish(data: any) {
        if(!this.queueUrl)
            await this.init();

        const sendMessageCommand = new SendMessageCommand({
            QueueUrl: this.queueUrl,
            MessageBody: JSON.stringify(data),
        });
        console.log(`Publishing to ${SQSPublisher.QUEUE_NAME}`);
        await this.sqsClient.send(sendMessageCommand);
    }
}