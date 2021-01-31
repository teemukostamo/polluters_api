# Polluters API

### An API providing both REST and Graphql endpoints for fetching data on the worst polluters by year.

A Node/Express/Apollo/Graphql application, that fetches data from a corrupt .csv file, and serves the parsed data from both REST and Graphql endpoints sorted by year and worst polluters. App is deployed [here](https://polluters-api.herokuapp.com/).

## Requirements

Made with Node version 14.xx.x. If you haven't installed Node or npm, [nvm](https://github.com/nvm-sh/nvm) is an easy to use tool for installing both. Nvm is also handy if you want to quickly switch between different Node versions.

## About source data

The `fossil-fuel-co2-emissions-eviled-1.csv` consists of following data:

| **Field name**                | Order | Data type | **Description**                                                                                      |
| ----------------------------- | ----- | --------- | ---------------------------------------------------------------------------------------------------- |
| `Year`                        | 1     | Year      | Total carbon emissions from fossil fuel consumption and cement production (million metric tons of C) |
| `Country`                     | 2     | String    | Total carbon emissions from fossil fuel consumption and cement production (million metric tons of C) |
| `Total`                       | 3     | Number    | Total carbon emissions from fossil fuel consumption and cement production (million metric tons of C) |
| `Solid Fuel`                  | 4     | Number    | Carbon emissions from solid fuel consumption                                                         |
| `Liquid Fuel`                 | 5     | Number    | Carbon emissions from liquid fuel consumption                                                        |
| `Gas Fuel`                    | 6     | Number    | Carbon emissions from gas fuel consumption                                                           |
| `Cement`                      | 7     | Number    | Carbon emissions from cement production                                                              |
| `Gas Flaring`                 | 8     | Number    | Carbon emissions from gas flaring                                                                    |
| `Per Capita`                  | 9     | Number    | Per capita carbon emissions (metric tons of carbon; after 1949 only)                                 |
| `Bunker fuels (Not in Total)` | 10    | Number    | Carbon emissions from bunker fuels (not included in total)                                           |

Some values are unfortunately corrupt in the source .csv file. Corrupt data are handled as follows:

- If a Year value is missing, the .csv parser checks to see if next and previous years have the same value, and sets one of those values as Year
- If a Country value is missing, a string `corrupt data` is set as the country value
- If a number representing pollution amount is missing, that value is set as `null`.

## Installation / Getting started

- Clone the repository and run `npm install` in the root directory.
- Create a `.env` file in the root directory and copy the contents of the `.env.template` file there.
- Run `npm run initdb`. This will initialize the [NEDB](https://github.com/louischatriot/nedb) database, parse polluter data from the `fossil-fuel-co2-emissions-eviled-1.csv` -file and save to `database.db` -file in the project root directory.
- Run `npm run dev` to run the server in development mode with `nodemon`

## Tests

Run `npm run test` to run tests.

## REST endpoint

REST endpoint for polluters data can be accessed at `/worst/polluters`.

Mandatory parameters are:

- `from` - the starting year from where results are shown. Must be a number between 1752 and 2014.
- `type` - what type of pollution data is shown. Available types are:
  - `total`
  - `solidfuel`
  - `liquidfuel`
  - `gasfuel`
  - `cement`
  - `gasflaring`
  - `percapita`
  - `bunkerfuels`

Optional parameters are:

- `to` - the year results are shown up to. Must be a number greater than `from` and between 1752 and 2014. By default data is shown up to 2014.
- `top` - the number of top polluters shown from each year. Default number is 50. Must be a number between 1 and 100.

**Examples**:

- Request `/worst/polluters?from=2011&top=5&type=Total` returns top 5 polluters sorted by total pollution, starting from 2011.
- Request `/worst/polluters?from=2000&to=2014&type=cement&top=10` returns top 10 polluters sorted by cement production emissions, starting from 2000, ending at 2014.

## Graphql

GraphQL playground offers documentation on how to use the API. Start the server by running `npm run dev`, open the GraphQL playground at http://localhost:4000/graphql and click the "docs" tab.

## Docker

- To build a Docker image of the application, run `docker build -t polluters_api .` in the root directory.
- To run the container, run `docker run -p 4000:4000 polluters_api`

## CI/CD

The app uses Github Actions for CI/CD. Jobs in the pipeline include running ESLint, tests, pushing the app to Heroku and bumping up the version number. The use of GitHub is required for the pipeline. To remove automatic deployment, delete the `deployment` job from `.github/workflows/pipeline.yml`.

## Deployment

To deploy to Heroku, create a Heroku app and add it as a remote. Run the following commands to set Heroku environment variables:

- `heroku config:set PORT=4000`
- `heroku config:set DATABASE_NAME=database.db`

To keep automatic deployment in the CI/CD pipeline, add your Heroku API key to your GitHub repository secrets. Heroku API key is found on Heroku dashboard at `Account settings -> API key`. Change the `heroku_app_name` and `healthcheck` url match the ones of your newly created Heroku app.

# Improvements / Further development

Below are listed some further development ideas:

- Refactoring the application with TypeScript for static type checking
- Using esm or similar solution to enable ES6 import/export modules.
- The Graphql schema could use pagination and cursor fields. Some redundancy is also present in naming.
- The option to sort results in ascending order
- Incoming requests should be logged permanently.
- The REST endpoint could support selecting multiple types, eg. `['total', 'cement']`
- For NEDB, data modeler like Camo would help making requests.
- For production level app, a more robust database would be necessary:
  - MongoDB and Mongoose would be good choices for a document database if database needs remain simple enough.
  - If a more complex database would be required, a relational database would perhaps be a better choice.
- Caching data for faster performance. Redis for example has solutions for both Apollo and Express servers.
- Creating a development branch and deployment environment for testing changes before pushing to procution.

Some points of interest beyond the scope of this application include:

- Getting pollution data from multinational corporations
- Getting data on where the result of the pollution ends up in. For example, if a developing nation has high emissions because they produce cheap fashion or electronics for the western consumer, what country or corporation is responsible of those emissions?
