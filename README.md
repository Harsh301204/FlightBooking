# Creating Booking Service 

- First we initialize new npm package
```
npm init
 ```
 - now we install some dependencies we need for this project 
 ```
express
nodemon 
body-parser
sequelize
sequelize-cli
mysql2
http-status-codes
dotenv
morgan
```
- created ``.gitignore`` , ``.env`` files and ``src`` folder
- added node_modules and .env in gitignore
- will set express server
- create serverConfig file in Config folder and config our dotenv there
- initialize sequelize , it will create some folders 
```
npx sequelize init
```
- we rename our db name and change the user and password to ur db id and password in development in config.json file
- will put this file in .gitignore
- will create our db using sequelize command 
```
npx sequelize db:create
```
- create repository , services , controllers , utils , routes folder in src folder
- will setup routes folder now
- created a v1 folder to handle all request coming with v1 
- created a index file in router file that will redirect our request to index file in v1 folder 

- now syncing our db
- creating error folder in utils 
- starting with service errors
- created validation error file and a general app error file

- generated a new Booking Model using sequelize 
- migrated our Booking Model after adding some basic values inside it

- adding new migration to update and modify
```
npx sequelize migration:create --name <name of file>
```
- adding coloumn using this migration file created to our database (addColoumn function)
- adding the new coloumn in booking model
