# ETNA - TIC-CLO5 : My Booking Services
## _PIERIN Alexandra, DELON Guillaume, NGO Trithuan, RESSAYRE Léo_


TIC-CLO5 is a module created to learn how to work in a DevOps logic, to realize a web application designed in microservices, and deployed in a cluster infrastructure.

## API
First, the API, is stored in a _projet-hotel_ folder, which is structured like so : 

```
projet-hotel
├── global-api
│   └── server.ts
├── microservices
│   ├── categories
│   │   └── src
│   │       ├── controllers
│   │       │   └── categories.controller.ts
│   │       ├── middlewares
│   │       │   └── auth.middleware.ts
│   │       ├── routes
│   │       │   └── categories.route.ts
│   │       └── server.ts
│   ├── hotels
│   │   └── src
│   │       ├── controllers
│   │       │   └── hotels.controller.ts
│   │       ├── middlewares
│   │       │   └── auth.middleware.ts
│   │       ├── routes
│   │       │   └── hotels.route.ts
│   │       └── server.ts
│   ├── rooms
│   │   └── src
│   │       ├── controllers
│   │       │   └── rooms.controller.ts
│   │       ├── middlewares
│   │       │   └── auth.middleware.ts
│   │       ├── routes
│   │       │   └── rooms.route.ts
│   │       └── server.ts
│   ├── reservations
│   │   └── src
│   │       ├── controllers
│   │       │   └── reservations.controller.ts
│   │       ├── middlewares
│   │       │   └── auth.middleware.ts
│   │       ├── routes
│   │       │   └── reservations.route.ts
│   │       └── server.ts
│   └── database
│       └── src
│           ├── config
│           │   └── database.config.ts
│           ├── models
│           │   ├── category.ts
│           │   ├── hotel.ts
│           │   ├── reservation.ts
│           │   └── room.ts
│           ├── services
│           │   ├── category.service.ts
│           │   ├── hotel.service.ts
│           │   ├── reservation.service.ts
│           │   └── room.service.ts
│           └── index.ts
├── tests
│   └── integration
│       ├── hotels.test.ts
│       ├── reservations.test.ts
│       ├── rooms.test.ts
│       └── categories.test.ts
├── .env
├── tsconfig.json
├── package.json
└── .gitignore
```

The code is composed of : 
 - 4 microservices, stored in the microservices/categories, the microservices/hotels, the microservices/rooms, and the _microservices/reservations_ folders.
 - 1 database microservice, which implements functions used by the microservices to make requests to the database
 - 1 _global-api folder_, which contains the _index.ts_ file, which is the global API server.
 
### Microservices
The 4 microservices are implemented like so : 
We first have the _src/server.ts_ file, which implements a simple express server and include the microservice's router (defined in the _src/routes/microservice.route.ts_ file). Then, there is the _src/controllers_ folder which contains the _src/controllers/microservice.controller.ts_ file. This file uses the database's service classes to retrieve or insert datas in the database, and finally send the response back to the client.
Finally, each of the microservices have a _src/middlewares_ folder, each containing a _auth.middleware.ts_ file. They implement an authentication middleware that uses the 'Authorization' field of the request's header, and verify it.

### DatabaseService
This DatabaseService is implemented like so : 
First, there is the _src/config/database.config.ts_, which is used to create a connection between the API and the MySql database. We decided to use the Sequelize ORM to ease the connection with the database.
Then we have the _src/models_ folder, which contains all the models, corresponding to the different database tables.
We also have the _src/services_ folder, which implements a class, used to join all models. It also is used to declare the different database methods that will be usefull for the rest of the API, and especially, for the different microservices.
Finally, the _src/index.ts_ file that is used to synchronise the database with the models created in the database microservice.

### global-api
The _global-api_ folder contains one _src/index.ts_ file, which implements an express server. This express server will be the only one that can be accessed from the outside. It will be used to dispatch the requests to the different microservices, using axios to create a client for each of the microservices, and then, to make the request to the different routes of those microservices.

### Usage
##### Pre-requisites
For this to work, you must have node installed (version 16 or higher), but also npm.
First clone the repository, then run this command :

```sh
npm install
```

Furthermore, you need to have a MySql database installed.
Finally, you need to create a .env file, using the .env.example file.

##### Launch
In the _package.json_ file, you can notice different scripts :

| Script name | Infos |
| ------ | ------ |
| start | To start the microservices and the global API (so the whole project) |
| clean:dist | To clean the _./dist_ folder, which contains the compiled typescript code |
| start:api | To start the global API, but not the microservices |
| start:microservices | To start all microservices but not the global API |
| start:hotel-service | To only start the __hotels__ microservice |
| start:reservation-service | To only start the __reservation__ microservice |
| start:room-service | To only start the __room__ microservice |
| start:category-service | To only start the __category__ microservice |
| build | To compile all typescript files, according to the _./tsconfig.json_ configuration |
| build:watch | To compile all typescript file in dynamic mode, so that any change in the scoped files will trigger another compilation |
| db:sync | To only start the __category__ microservice |

You can use any of theese scripts by running this command on your terminal : 
```
npm run {script name}
```

To start the project, you have to first compile the code, using this command : 

```sh
npm run build
```
... then, synchronyze your local MySql database with this command : 

```sh
npm run db:sync
```
... and then, you can start the project using this command : 

```sh
npm run start
```
