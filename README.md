# KLIC Weather Station

This is a project to receive data from physical weather station(s) via MQTT and then publish it into a database and display the results onto a React App.

# Getting Started

Start by installing the dependencies.

```bash
$ yarn install
```

## Commands

### `yarn run start`

Starts the local Lambda development environment.

### `yarn run build`

Build your app and synthesize your stacks.

Generates a `.build/` directory with the compiled files and a `.build/cdk.out/` directory with the synthesized CloudFormation stacks.

### `yarn run deploy [stack]`

Deploy all your stacks to AWS. Or optionally deploy a specific stack.

### `yarn run remove [stack]`

Remove all your stacks and all of their resources from AWS. Or optionally remove a specific stack.

### `yarn run test`

Runs your tests using Jest. Takes all the [Jest CLI options](https://jestjs.io/docs/en/cli).

## SST Documentation

Learn more about the Serverless Stack.

- [Docs](https://docs.serverless-stack.com)
- [@serverless-stack/cli](https://docs.serverless-stack.com/packages/cli)
- [@serverless-stack/resources](https://docs.serverless-stack.com/packages/resources)
