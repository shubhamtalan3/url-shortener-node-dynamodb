# URL Shortener (TinyURL)

A scalable URL shortener service built with Node.js, DynamoDB, and Redis.

## Setup

### Local Development (Docker Compose)

````bash
# Start services
docker-compose up --build


# Run tests
npm test

### `package.json`
```json
{
"name": "url-shortener",
"version": "1.0.0",
"main": "api/server.js",
"scripts": {
"start": "node api/server.js",
"dev": "nodemon api/server.js",
"test": "mocha tests --exit"
},
"dependencies": {
"express": "^4.18.2",
"pg": "^8.11.3"
},
"devDependencies": {
"mocha": "^10.2.0",
"chai": "^4.3.7",
"nodemon": "^3.0.1"
}
}
````
