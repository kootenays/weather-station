# KLIC Weather Station

This is a project to receive data from physical weather station(s) via MQTT and then publish it into a database and display the results onto a React App.

# Getting Started

To start your own development environment, you will need to sign up to [AWS](https://aws.amazon.com/). Once you have your account, then you will be able to deploy your own environment and work on this project. If you are working on the frontend only, you will be able to instead just connect to the hosted api.

With your account setup, you will need to do the following:

- [Create an IAM user](https://serverless-stack.com/chapters/create-an-iam-user.html)
- [Configure the AWS CLI](https://serverless-stack.com/chapters/configure-the-aws-cli.html)
  - Make sure that you configure the profile name to be `klic-dev` as that is the default profile used for development deployments

Once that is completed, you can do the following to deploy the repository

```bash
$ yarn install
$ yarn sst:build
$ yarn sst:deploy
```

You should now have your instance up and running so you can start your development. See below other commands.

> NOTE: Deploying this application may incur some costs from AWS, even on their Free Tier. Please ensure that you remove your deployed stack to reduce these running costs.

## Commands

### `yarn run sst:start`

Starts the local Lambda development environment.

### `yarn run sst:build`

Build your app and synthesize your stacks.

Generates a `.build/` directory with the compiled files and a `.build/cdk.out/` directory with the synthesized CloudFormation stacks.

### `yarn run sst:deploy [stack]`

Deploy all your stacks to AWS. Or optionally deploy a specific stack.

### `yarn run sst:remove [stack]`

Remove all your stacks and all of their resources from AWS. Or optionally remove a specific stack.

### `yarn run sst:test`

Runs your tests using Jest. Takes all the [Jest CLI options](https://jestjs.io/docs/en/cli).

## SST Documentation

Learn more about the Serverless Stack.

- [Docs](https://docs.serverless-stack.com)
- [@serverless-stack/cli](https://docs.serverless-stack.com/packages/cli)
- [@serverless-stack/resources](https://docs.serverless-stack.com/packages/resources)
