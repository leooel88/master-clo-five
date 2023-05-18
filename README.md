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
│   ├── configuration
|   |   ├── database
│   │   │   ├── config
│   │   │   │   └── database.config.ts
│   │   │   ├── models
│   │   │   │   └── category.ts
│   │   │   ├── seeds
│   │   │   ├── services
│   │   │   │   └── category.service.ts
│   │   │   └── index.ts
│   │   ├── src
│   │   │   ├── controllers
│   │   │   │   └── categories.controller.ts
│   │   │   ├── linkers
│   │   │   │   └── users.linker.ts
│   │   │   ├── middlewares
│   │   │   │   └── auth.middleware.ts
│   │   │   ├── routes
│   │   │   │   └── categories.route.ts
│   │   │   ├── types
│   │   │   │   └── types.d.ts
│   │   │   └── server.ts
│   │   ├── .env.example
│   │   ├── package.json
│   │   └── tsconfig.json
|   |
│   ├── hotels
|   |   ├── database
│   │   │   ├── config
│   │   │   │   └── database.config.ts
│   │   │   ├── models
│   │   │   │   ├── room.ts
│   │   │   │   └── hotel.ts
│   │   │   ├── seeds
│   │   │   ├── services
│   │   │   │   ├── room.service.ts
│   │   │   │   └── hotel.service.ts
│   │   │   └── index.ts
│   │   ├── src
│   │   │   ├── controllers
│   │   │   │   ├── hotels.controller.ts
│   │   │   │   └── rooms.controller.ts
│   │   │   ├── linkers
│   │   │   │   └── users.linker.ts
│   │   │   ├── middlewares
│   │   │   │   └── auth.middleware.ts
│   │   │   ├── routes
│   │   │   │   ├── hotels.route.ts
│   │   │   │   └── rooms.route.ts
│   │   │   ├── types
│   │   │   │   └── types.d.ts
│   │   │   └── server.ts
│   │   ├── .env.example
│   │   ├── package.json
│   │   └── tsconfig.json
|   |
│   ├── reservations
|   |   ├── database
│   │   │   ├── config
│   │   │   │   └── database.config.ts
│   │   │   ├── models
│   │   │   │   └── reservation.ts
│   │   │   ├── seeds
│   │   │   ├── services
│   │   │   │   └── reservation.service.ts
│   │   │   └── index.ts
│   │   ├── src
│   │   │   ├── controllers
│   │   │   │   └── reservations.controller.ts
│   │   │   ├── linkers
│   │   │   │   ├── configurations.linker.ts
│   │   │   │   ├── hotels.linker.ts
│   │   │   │   └── users.linker.ts
│   │   │   ├── middlewares
│   │   │   │   └── auth.middleware.ts
│   │   │   ├── routes
│   │   │   │   └── reservations.route.ts
│   │   │   ├── types
│   │   │   │   └── types.d.ts
│   │   │   └── server.ts
│   │   ├── .env.example
│   │   ├── package.json
│   │   └── tsconfig.json
|   |
│   └── users
|       ├── database
│       │   ├── config
│       │   │   └── database.config.ts
│       │   ├── models
│       │   │   └── user.ts
│       │   ├── seeds
│       │   ├── services
│       │   │   └── user.service.ts
│       │   └── index.ts
│       ├── src
│       │   ├── controllers
│       │   │   └── users.controller.ts
│       │   ├── middlewares
│       │   │   └── auth.middleware.ts
│       │   ├── routes
│       │   │   └── users.route.ts
│       │   ├── types
│       │   │   └── types.d.ts
│       │   └── server.ts
│       ├── .env.example
│       ├── package.json
│       └── tsconfig.json
|    
├── tests
│   └── integration
│       ├── hotels.test.ts
│       ├── reservations.test.ts
│       ├── rooms.test.ts
│       └── categories.test.ts
├── .env.example
├── tsconfig.json
├── package.json
└── .gitignore
```

The code is composed of : 
 - 4 microservices, stored in the _microservices/configuration_, the _microservices/hotels_, the _microservices/reservations_, and the _microservices/users_ folders.
 - 1 _global-api folder_, which contains the _index.ts_ file, which is the global API server.

We decided to divide the business logic into four microservices :

#### HOTELS
This microservice servs as catalog microservice. It will manage the hotel creations, and the rooms creation inside those hotels.
It is linked to the USER microservice, for authentication purposes, and to the CONFIGURATION microservice.

#### CONFIGURATION
This microservice is used to configure global variables, used in the whole hotel managment.
For example, it hosts the room categories policy, like what type of room can be created in a hotel, costing what price, with what maximum person number...
It also hosts the price policy, like for example for the extra services prices (breakfast price, romance pack price...).
In the end, this microservice's use will be to enable the administrators to modify the global policy, without touching to the reservations, or to the hotels themselves.
Note that this microservice also uses the USER microservice for authentication purposes.

#### RESERVATIONS
This microservice is used to manage the reservations. Using the HOTEL microservice, and the CONFIGURATION microservice, it will calculate the prices, check the availability...
This microservice uses the USER microservice for authentication purposes.

#### USERS
This microservice is used to manage the access to the API. It will host the implementation of the authentication logic, as well as for the creation and modification of users of the database.

#### Authentication Logic
This project implements a simple ADMIN/NON-ADMIN/NON-AUTHENTICATED authentication policy :
 - A NON authenticated user will only have access to the LOGIN route of the USERS microservice (_http://...../users/login_)
 - An authenticated user will only have access to the GET routes of the HOTELS, CONFIGURATION, and RESERVATION microservices, in order to retrieve datas. Furthermore, it will also be able to use the POST, PUT and DELETE routes of the RESERVATIONS microservice, but only if it concerns a reservation owned by himself. As for the USER microservice, he will be able to use all GET, POST, PUT and DELETE routes, but only if it concerns his own account
 - Finally, an authenticated user with ADMIN accesses will be able to use any route, of any microservice.
 
### Microservices structure
The 4 microservices are implemented like so :
We first have the database folder, containing the files needed for the database managment of the microservice. Their way of working is described later.
Then, there is the src folder, containing a __controllers__ folder, used to host the controllers of the microservice, a __routes__ folder, used to host the routers of the microservice, a __types__ folder, containing the files in which all types used in the microservice (usually, the types of the data that are transfered from other microservice, in order to keep the typing all over the code), a __linkers__ folder, and a __middlewares__, that contains the middlewares used in the microservice (mainly the authentication middleware, used to authenticate a user).
The __linkers__ folder contains files, that implement functions in order to make requests from the current microservice, to another microservice. To do so, each linker will instanciate an axios client, which will be used to make requests to other microservice's APIs.
We also find a _server.js_ file, which implements a simple express server, which once launched, will enable users to make request to the microservice.
Finally, we have the _.env.example_ file, presenting the different environment vairables to create in order to make the microservice work, the _package.json_ file, important file in a NodeJs project, and also the _tsconfig.json_ file, used to configure typescript in the project.

### Database Folders
Theese folders are structured like so : 
First, there is the _database/config/database.config.ts_ file, which is used to create a connection between the microservice and the MySql database. We decided to use the Sequelize ORM to ease the connection with the database.
Then we have the __database/models__ folder, which contains all the models, corresponding to the different database tables of the microservice.
We also have the __database/services__ folder, which hosts differnt files, each implementing functions to ease insertion and retrievment of datas in the database. Those functions are then used in the controllers.
Finally, the _src/index.ts_ file that is used to synchronise the database with the models created in the database microservice.

### global-api
The _global-api_ folder contains one _src/index.ts_ file, which implements an express server. This express server's use is to create a single point of access, to ease testing. It is not mandatory to use it. It will be used to dispatch the requests to the different microservices, using axios to create a client for each of the microservices, and then, to make the request to the different routes of those microservices.

### Usage
##### Pre-requisites
For this to work, you must have node installed (version 16 or higher), but also npm.
First clone the repository, then run this command :

```sh
npm install
```

Furthermore, you need to have a MySql database installed.
Finally, you need to create all environment variables specified in the .env.example files.
If you run the project for development puposes, you can use the _projet-hotel/.env.example_ file, but if you are deploying the microservices, use the _.env.example_ files of each microservices.

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
| start:configuration-service | To only start the __configuration__ microservice |
| start:user-service | To only start the __user__ microservice |
| build | To compile all typescript files, according to the _./tsconfig.json_ configuration |
| build:watch | To compile all typescript file in dynamic mode, so that any change in the scoped files will trigger another compilation |
| db:sync | To synchronize and connect all microservices databases |
| db:sync-hotel-db | To synchronize and connect the hotel microservice database |
| db:sync-reservation-db | To synchronize and connect the reservation microservice database |
| db:sync-user-db | To synchronize and connect the user microservice database |
| db:sync-configuration-db | To synchronize and connect the configuration microservice database |

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

### Docker Usage

To dockerize the whole project, it is necessary to build and run microservices seperatly. The process
to achieve this is the same for each microservices :

 - Ensure the package.json of the microservice includes an npm start script that launches the
 db:sync script and then, that launches the start:microservice script
 - Ensure the .env file is created with the write values
 - Build the docker image from the microservice root directory, using this command :

```sh
docker build -t hotel-reservation-api-<NAME OF THE MICROSERVICE>-microservice:1.0.0 .
```
 - Run the created Image using this command :

 ```sh
 docker run --env-file .env -p 8000:<PORT OF THE MICROSERVICE (in the .env file)> hotel-reservation-api-<NAME OF THE MICROSERVICE>-microservice:1.0.0
 ```
