# Persons API
### _A really fun assessment._
I just want to express my gradtitude for giving me this oppurtunity and it was a really fun challenge to do so far for that I thank you.

## Features
 
- Created AWS Infrasture with AWS CDK using TypeScript
- Lambda functions written in TypeScript
- Unit testing using JEST
- Installed [Husky](https://typicode.github.io/husky/#/) for git hooks and best practices
- Can be deployed in multiple stages

## CDK Challenge (the fun part!)
This has been the really fun part thus part. This actually made me think to create the infrastructure as simple, as granular and as readable as possible.
_Technology stack_
- __Node 16.x__
- __TypeScript__ - langauge used in creating IaaC and the lambda functions
- __AWS CDK__ - main tool to create the infracstructure used for this challenge
- __Jest__ - main testing suite for testing logical components
- __github workflow actions__ - used for ci/cd of the code
- __husky__ - commit hooks for commit best practices
- __AWS Services__
    - CloudWatch
    - X-ray
    - DynamoDB
    - SQS
    - SNS
    - API Gateway
    - Lambda Function
    - and many relevant services used to make the API

__Deployment Commands__
```sh
npm run deploy:{stageName}
```
_Note_
```
stageName = 'dev' | 'test' | 'staging' | 'prod' # as per configuration in package.json
```

__Endpoints__
- GET /person - gets the all saved person data
- GET /person/{id} - gets the person data of a specific person using id
- POST /person - saves new record of person
- PUT /person/{id} - updates a specific person
- DELETE /person/{id} - deletes a specific person

__To Test__
```sh
npm i
npm test
```
# API
### CREATE
Create new person record, set it as a JSON object or an array of JSON object
```sh
curl --location --request POST 'https://{apiGatewayId}.execute-api.ap-southeast-1.amazonaws.com/dev/person' \
--header 'Content-Type: application/json' \
--data-raw '
{
    "firstName": "Jon",
    "lastName": "Snow",
    "address": "Wall",
    "phone": "+123456"
}
'
```
### READ
Read all saved person
```sh
curl --location --request GET 'https://{apiGatewayId}.execute-api.ap-southeast-1.amazonaws.com/dev/person'
```

Read a specific record
```sh
curl --location --request GET 'https://{apiGatewayId}.execute-api.ap-southeast-1.amazonaws.com/dev/person/{id}'
```

### UPDATE
Update a specific record
```sh
curl --location --request PATCH 'https://{apiGatewayId}.execute-api.ap-southeast-1.amazonaws.com/dev/person/{id}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Jon",
    "lastName": "Sand",
    "address": "Westeros",
    "phone": "+123456"
}'
```

### DELETE
Delete a specific record
```sh
curl --location --request DELETE 'https://{apiGatewayId}.execute-api.ap-southeast-1.amazonaws.com/dev/person/{id}'
```