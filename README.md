

## Project description
### Project name:
NPM Explorer

### Project description:
NPM Explorer aims to allow a more user-friendly usage of the [NPM package repo](npmjs.com/) and the [NPM Registry](https://registry.npmjs.org/).  
This project has 3 functionalities:
- Npm Explorer
- Npm Advanced Search
- Npm Search History

Only the first 2 have been implemented so far.

### Project tech:
The project is developed in `NextJS` with `Typescript` and `Firebase` (RTDB) on the backend. Testing is done with `Cypress` altho testing is not yet implemented. The API is implemented with `ApolloClient` and the GraphQL server with `apollo-server-micro`

## Getting Started

First, run the development server:

```bash
# in first terminal
yarn dev

# in second terminal
yarn emulators
```

Client running on [http://localhost:3000](http://localhost:3000).

Open [http://localhost:4000](http://localhost:4000) with your browser if you want to see the running Firebase emulators. This example project uses only Realtime DB emulator - http://localhost:4000/database/npm-explorer-default-rtdb/data

