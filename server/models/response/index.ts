export class Response {
    headers = {
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Headers': 'Content-Type,X-Api-Key',
      'Access-Control-Allow-Credentials': 'false',
    };
    statusCode:number = 200;
    body?:any;
    constructor(statusCode: number, body?:any) {
        this.statusCode = statusCode;
        this.body = body;
    }

    toJSON(){
        return {
            headers: this.headers,
            statusCode: this.statusCode,
            body: this.body
        };
    }
}