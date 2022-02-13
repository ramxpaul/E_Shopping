# Storefront Backend Project

## Technologies Used On Project
using of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
- Bcrypt from npm for password security

## Getting Started
First : How To Setup Files
You Can Setup Files and Dependencies by pressing npm install
that command will install all packages and dependencies used into project

Second : Connecting to The Database
There are Two Database , Main DB for Development and it's called store_front_dev and you can connect to it by 
using the following meta command \c store_front_dev
The other Database is for Testing Purpose and it's called store_front_test and you can connect to it by
using the following meta commande \c store_front_test

## Routes and Database Ports :
Routes :
using the localhost:8000 Port for it

Database :
using the 3000 Port for it

## Package Installation Instruction :
Postgres : npm i pg    , npm i --save-dev @types/pg
Express : npm i express , npm i --save-dev @types/express
TypeScript : npm i typescript 
dotenv : npm i dotenv   , npm i --save-dev @types/dotenv
db-migration : npm i db-migration 
JWT : npm i jsonwebtoken  , npm i --save-dev @types/jsonwebtoken
Bcrypt : npm i bcrypt , npm i --save-dev @types/bcrypt
jasmine : npm i jasmine , npm i --save-dev @types/jasmine

## Instruction to Use API
First: for Testing Purposes You have to 
1- npm run tsc or npm run build
2- npm run test

Second For Development Purposes you have to 
1- npm run migrate
2- npm run start

Third For checking Purposes you have to 
- npm run watch