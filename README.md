# Serverless framework example & Lambda/NodeJS optimization with http-keep-alive

This PoC is used to give a short overview of the serverless.com framework and at the same time to show how we can decrease the execution time of NodeJS Lambdas that do http calls (ie: when using the aws-sdk to get records from DynamoDB).

## Requirements
* NodeJS
* Serverless


```bash
npm install serverless -g
```

## Usage
After cloning the repository, copy the account-example.yml to account.yml and change the account id inside with your AWS account id.
In serverless.yml change the 'dev' value in the profile section with the profile that you're using in your AWS credentials file which is associated to the account specified in account.yml:


```python
  profile: ${opt:profile, 'dev'}
```

## Deploy
To deploy simply run:

```bash
  npm install
  sls deploy -v
```
You can also avoid to set the profile in the serverless.yml and pass it as parameter when launch the deploy command:

```bash
  sls deploy -v --profile dev
```
