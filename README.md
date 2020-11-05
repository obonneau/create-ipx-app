# create-ipx-app

A cli tool to create a starter IPX application.


## Getting started

1. Fork the repo and clone your local copy.
2. Install dependencies: `npm i`
3. Add your IPX configuration inside the `config.json` file.
    **Config file**
    - `organizationId ` : Coveo organization  id
    - `pageId`: IPX id
    - `pageName`: IPX name
    - `apiKey` : API key created in the coveo platform
   
    **Note** the API key must have both `Edit Search Pages` and `Execute Queries` privileges.
    

## Workflow

1. Start the dev server by running `npm start`.
2. Make changes to the html, css and js files in the `src` directory.
3. Publish your changes to the cloud by running `npm run publish`.


## Commands

- `npm start`: Starts the dev server.
- `npm run publish`: Synchronizes your IPX with the cloud.
- `npm run create:config`: Creates a config.json file.
