# Polluters API

### An API providing both REST and Graphql endpoints for fetching data on the worst polluters by year.

A Node/Express/Apollo/Graphql application, that fetches data from a corrupt .csv file, and serves the parsed data from both REST and Graphql endpoints sorted by year and worst polluters.

## Requirements

Made with Node version 14.xx.x. If you haven't installed Node or npm, [nvm](https://github.com/nvm-sh/nvm) is an easy to use tool for installing both. Nvm is also handy if you want to quickly switch between different Node versions.

## Installation / Getting started

- Clone the repository and run `npm install` in the root directory.
- Create a `.env` file in the root directory and copy the contents of the ´.env.template` file there.
- Run `npm run initdb`. This will initialize the [NEDB](https://github.com/louischatriot/nedb) database, parse polluter data from the `fossil-fuel-co2-emissions-eviled-1.csv` -file and save to `database.db` -file in the project root directory.
- Run `npm run dev` to run the server in development mode with `nodemon`

## About source data

The `fossil-fuel-co2-emissions-eviled-1.csv`

## REST endpoint

REST endpoint for polluters data can be accessed at `/worst/polluters`. Mandatory parameters are:

- `from` - the starting year from where results are shown. Must be a number between 1752 and 2014.
- `type` - what type of pollution data is shown. Available types are:

| Type Name |                                             Description                                              |
| --------- | :--------------------------------------------------------------------------------------------------: |
| Total     | Total carbon emissions from fossil fuel consumption and cement production (million metric tons of C) |

## Graphql endpoint
