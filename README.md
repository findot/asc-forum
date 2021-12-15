# asc-forum
A simple forum developed in **A**ngular / **S**pring / **C**amel.

The aim of this project is for his author to learn a specific tech stack.

## Getting started 

### With Docker

TODO

### Without Docker

Prerequisites:

1. Have a Java Runtime Environment version 11 or superior;
2. Have Gradle installed;
3. Have NodeJS and NPM installed;
4. Have a MySQL or MariaDB server available.

#### Running the backend development server
Once the prerequisites are satisfied, configure your database access details in the `application.properties` file:

```bash
cd ${PROJECT_ROOT}/src/main/resources
vim application.properties
```

Replace the following key/value pairs with your own configuration details:
```ini
spring.datasource.url=jdbc:mysql://${MYSQL_HOST:localhost}:${MYSQL_PORT:3306}/${MYSQL_DATABASE:ascforum}
spring.datasource.username=${MYSQL_USER:ascforum}
spring.datasource.password=${MYSQL_PASSWORD:secret}
```
Once this is done and the database is available, start the Spring development server:

```bash
cd ${PROJECT_ROOT}
gradle bootRun
```

Once gradle gathered the necessary dependencies and the project was built - this may take a little while the first time, the API should be available at [localhost:8080](http://localhost:8080)!

#### Running the frontend development server

Get to the frontend project root and run the NPM start script:

```bash
cd ${PROJECT_ROOT}/src/main/js
npm run start
```

Once NPM pulled ~~half of the cosmos~~ the necessary dependencies, the project should be available at [localhost:4200](http://localhost:4200)!

**NOTE**: The frontend app won't work without access to the backend API. If the backend server doesn't run on the same machine, change the `proxy.conf.json` configuration file to reflect your setup and restart the server!

## Building the project for deployment

The building process is rather straightforward however it's important to **build the frontend app prior to the backend app**. The reason for this order is that the backend server will place the assets in the resulting jar. Without the compiled frontend assets, the resulting jar cannot serve the SPA. If the frontend app is served by a different server altogether - Nginx, Apache, etc., feel free to build in whichever order you prefer.

### Building the SPA

Get to the frontend project root and run the build script:

```bash
cd ${PROJECT_ROOT}/src/main/js
npm run build
```

### Building the API Server

Get to the project root and run the Gradle build script:

```bash
cd ${PROJECT_ROOT}
gradle bootJar
```

The final build should now be available in `${PROJECT_ROOT}/build/libs`!

### Building the docker image

A slim alpine based dockerfile and a docker-compose sample configuration are provided:

```bash
docker build -t findot/ascforum:latest .
docker-compose up -d
```

