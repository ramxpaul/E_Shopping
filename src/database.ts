import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV
} = process.env;

const dbConfig = {
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT),
    database: ENV === "dev" ? POSTGRES_DB : POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
};

console.log('The Database will be using the following configuration settings', dbConfig)

let database = new Pool(dbConfig);

export default database