# Store Manager Project

## About the Project

This project consist of a REST API, being part of the Web Trybe Development Course. The API is a sales management system in the dropshipping format. It enables users to create, visualize, delete, and update products and sales.

There are two main routes in the API, the Products route and the Sales route. For more details access the documentaion.

## Documentation

The complete API documentation was developed using Postman. You can access the documentation with comments and examples for all routes using this [link](https://documenter.getpostman.com/view/21397186/UzJJtx5k).

## Used Technologies, Arquitecture & Tests

The project is based on the MSC arquitecture. Thus, the main files are divided in model to make the connection with the database, services to perform the validations, and controllers to receive and responde to user requests.

All layers of the MSC arquictecture were tested. The tests were created using:
- [Jest](https://jestjs.io/): testing framework;
- [Chai](https://www.chaijs.com): BDD / TDD assertion library;
- [Sinon](https://sinonjs.org/): stubs and mocks for JavaScript.

MySQL was used to the database in this project. The configuration files to create the database were provided by Trybe.

The Store Manager Project was developed using the following technologies and libraries:
- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Helmet](https://helmetjs.github.io/)
- [Morgan](https://github.com/expressjs/morgan)
- [ESLint](https://eslint.org/)
