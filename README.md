# COCUS TEST

## About this project
This project is designed to retrieve information about branches within a GitHub repository, taking the username as a parameter. It is built using the following technologies:


* NestJS: A framework for building efficient and scalable Node.js applications.
* Jest: A JavaScript testing framework.
* Axios: A promise-based HTTP client.

## Installation
To install the project dependencies and run it, simply execute the following commands in your terminal:

```
npm install
npm run start
```

There is also an `.env.example` that can be configured to a different url if it is needed, or in a case of different environments


## Usage

This project uses a Swagger definition to define its API endpoints. You can use tools like Swagger UI to interact with the API and explore its functionality.

The API provides the following endpoint:

`/github/{username}/repositories`: This endpoint returns a list of repositories for the specified user, including information about each branch (name and SHA).

### Example Usage:

```
Bash
curl http://localhost:3000/github/Kleder/repositories
```

This request will return a JSON response containing information about all repositories belonging to the user Kleder, including their branches and corresponding SHAs.


## Additional Information
For a more detailed and interactive exploration of the API, you can access the Swagger documentation at `http://localhost:3000/api`.
