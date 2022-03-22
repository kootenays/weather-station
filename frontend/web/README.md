# KLIC Weather Station Frontend app

The entire frontend of the Weather Station application is a Single-Page React Application.

# Getting Started

To start your own development environment, you will need to have access to an [Auth0](https://auth0.com/) account. Once you have your account, then you will be able to deploy your own environment and work on this project.

With your account setup, you will need to do the following:

- Copy the `.env` fileand rename the new file as `.env.development`
- Replace all environment variables with real values

Once that is completed, you can do the following to deploy the repository

```bash
$ yarn install
$ yarn start
```

You should now have your frontend up and running on `http://localhost:3000` so you can start your development. As you update files in the `src/` folder, the frontend app should live update.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
