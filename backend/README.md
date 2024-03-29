<h1 align="center">

  Busy Bee's API
</h1>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center"> Guide to the API side of Busy Bees and running a local version of the PostgreSQL database</p>
    <p align="center">

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

<hr/>
<hr/>

## Routes
### Users
<hr/>

####  Return All Users
##### Req
- method: 'GET'
- endpoint: '/api/users'
##### RES
```
[
    {
        "id": INT,
        "name": STRING,
        "email": STRING,
    },
]
```
####  Find user by email
##### Req
- method: 'GET'
- endpoint: '/api/users/:email'
##### RES
```
{
  "id": INT,
  "name": STRING,
  "email": STRING,
},
```
<hr/>

####  Create new User

> [!IMPORTANT]
> This endpoint does not start a session, it only creates a new instance in the table
##### Req
- method: 'POST'
- endpoint: '/api/users'
- Constraints:
  - Name:
    - Required
  - Email:
    - Required
    - Must be valid email
    - Must be unique
  - Password:
    - One uppercase letter
    - One lower case letter
    - one number
    - one symbol
    - at least 5 characters long
    - required
- Body:
```
{
  "name": STRING,
  "email": STRING,
  "password": STRING
},
```


##### RES
```
{
  "id": INT,
  "name": STRING,
  "email": STRING,
},
```
<hr/>

### Authentication
<hr/>

####  Sign up

##### Req
- method: 'POST'
- endpoint: '/api/auth/signup'
- Constraints:
  - Name:
    - Required
  - Email:
    - Required
    - Must be valid email
    - Must be unique
  - Password:
    - One uppercase letter
    - One lower case letter
    - one number
    - one symbol
    - at least 5 characters long
    - required
- Body:
```
{
  "name": STRING,
  "email": STRING,
  "password": STRING
},
```


##### RES
```
{
  "id": INT,
  "name": STRING,
  "email": STRING,
},
```
<hr/>

####  Login
##### Req
- method: 'POST'
- endpoint: '/api/auth/login'
- Constraints:
  - Email:
    - Required
  - Password:
    - Required
- Body:
```
{
  "email": STRING,
  "password": STRING
},
```

##### RES
```
{
  msg: 'Login Successful
},
```
<hr/>

####  Check current auth status
##### Req
- method: 'GET'
- endpoint: '/api/auth/status'


##### RES
```
{
  user: {
    id: INT,
    email: STRING,
    name: STRING
  }
},
```
<hr/>

####  LogOut

##### Req
- method: 'GET'
- endpoint: '/api/auth/logout'


##### RES
```
{
  msg: 'The user has been logged out'
},
```
<hr/>
<hr/>

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## PSQL Commands

```bash
# Check id postgres is online
$ sudo service postgresql status

# Get postgres online
$ sudo service postgresql start

# open postgres terminal command tool (psql)
$ sudo -u postgres psql

# See a list of avaliable databases
$ \l

# Create a new database
$ CREATE DATABASE chosenNameHere

# delete a database
$ DROP DATABASE chosenNameHere

# connect to a database
$ \c chosenNameHere

# display all tables in database that you are connected to
$ \dt

# Make a table in connected database
$ CREATE TABLE chosenNameHere(columnName columnDataType, nextColumn ..)

# check all the records in connected database
$ SELECT * FROM tableName

# Delete a table
$ DROP TABLE tableName
```

## Migration Commands
```bash


# Makes files of sql commands from code changes that will alter database when run
$ npm run migration:generate --name=descripted_name_here

# Make sure the dist folder is up to date
$ npm run build

# Run commands in new migration files to alter the database
$ npm run migration:run
```

### If you want to reset a table

```bash
- In terminal dedicated to database -

# open command line tool
$ sudo -u postgres psql

# Check names of databases you can move into
$ \l

# move into database for busyBees
$ \c busybees

# check names of existing tables
$ \dt

# delete the table
$ DROP TABLE changedTableName

# Makes file that reflects the changes you made to the table
$ npm run migration:generate --name=fileNameHere

# Run commands to recreate the table with the changes
$ npm run migration:run
```


## Helpful Resources

- [TypeORM Migrations in NestJS & Postgres](https://dev.to/amirfakour/using-typeorm-migration-in-nestjs-with-postgres-database-3c75)
- [Nest.js Docs](https://nestjs.com/)
- [TypeORM docs](https://typeorm.io/)
- [PostgreSQL docs](https://www.postgresql.org/docs/current/)
