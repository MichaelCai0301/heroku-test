const Pool = require("pg").Pool;
require("dotenv").config();

//development configuration
const devConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT
};

//production configuration
const proConfig = {
    connectionString: process.env.DATABASE_URL //process.env.DATABASE_URL comes from heroku addon

}

const pool = new Pool(
    process.env.NODE_ENV === "production" ? proConfig : devConfig
);

module.exports = pool;