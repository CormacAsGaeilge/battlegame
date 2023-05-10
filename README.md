# Battle Game Sample

## Prerequisites 
You will need the following to run this project
- AWS AccessKey and SecretKey
- serverless installed globally `npm install -g serverless`
- angular installed globally `npm install -g @angular/cli`
- typescript installed globally `npm install -g typescript`

## Deploying the Backend
To the deploy the backend, execute the following command in your terminal from the `/server` folder of the project

`npm install`

`npm run deploy`

This will use you AWS AccessKey and SecretKey to deploy to your AWS Account

## Running the Client
Navigate to the `/client/BattleGame` folder in your terminal and run the following commands

`npm install`

`ng serve`

The Client will be running on `localhost:4200` which should have CORS permissions to hit the backend endpoints.

You will need to add a `config.ts` to the route of the `/client/BattleGame/app` folder matching the format of the `config.sample.ts` file. You can find the API URL and Key in AWS API Gateway once the backend has deployed.

## Functionaly Present
- Create Player Endpoint (With DynamoDb persistence)
- Get Player Endpoint (By UUID)
- Get Leaderboard Endpoint (Returns the top 10 players by totalGoldStolen)
- Submit Battle Endpoint (Publishes an SQS message to be handled by the Battle Queue)
- Process Battle Worker (Is fed from the SQS queue and executes the battle logic, logging the battle step executions in Cloudwatch)
- Client Display Leaderboard
- Client Api Service
- Authenticated using API Key and CORS permissions to limit domain access
- POSTMAN Workspace to interact with each endpoint

## Thoughts on Improvements
There are a number of things I would change/add to improve this with additional time.

- Using DynamoDB for leaderboard manipulation was probably a misstep as scanning by a filter is very inefficent and could become very expensive as players grow
- I focused too much on the backend side and left too little time to properly implement the client side of the application
- The process battle worker needs some clean up as implementing the logic was one of the last things I did and is a bit sloppy
- I had started to plan out a level/experience system in my docs spreadsheet and would have liked to have been able to encorporate that in
- I would have liked to have been able to implement a BattleReport table in DynamoDb along with some read endpoints to let the user review their battle logs, instead of it only existing within Cloudwatch
- I definitely fell off on Unit Testing in this and definitely thing I could have done better implementing some at the very least for the business logic of the battle processor which may have helped simplify the issues I had trying to implement it
