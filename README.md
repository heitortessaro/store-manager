# Store Manager Project

## About the Project

This project consists of a REST API, being part of the Web Trybe Development Course. The API is a sales management system in the dropshipping format. It enables users to create, visualize, delete, and update products and sales.

There are two main routes in the API, the Products route and the Sales route. For more details, access the documentation.

## Documentation

The complete API documentation was developed using Postman. You can access the documentation with comments and examples for all routes using this [link](https://documenter.getpostman.com/view/21397186/UzJJtx5k).

## Used Technologies, Arquitecture & Tests

The project is based on the MSC architecture. Thus, the main files are divided into models to make the connection with the database, services to perform validations, and controllers to receive and respond to user requests.

All layers of the MSC arquictecture were tested. The tests were created using:
- [Jest](https://jestjs.io/): testing framework;
- [Chai](https://www.chaijs.com): BDD / TDD assertion library;
- [Sinon](https://sinonjs.org/): stubs and mocks for JavaScript.

MySQL was used for the database in this project. The configuration files to create the database were provided by Trybe.

The Store Manager Project was developed using the following technologies and libraries:
- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Helmet](https://helmetjs.github.io/)
- [Morgan](https://github.com/expressjs/morgan)
- [ESLint](https://eslint.org/)

# Future Steps
Future improvements objectives include:
- Add rescue to minimize the try/catch use
- Use [Join](https://joi.dev/api/?v=17.6.0) to perform validations
- Use [Chai as Promised](https://www.chaijs.com/plugins/chai-as-promised/) to create promises inside tests