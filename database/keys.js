import {Pool} from "pg";

const pool = new Pool({
    connectionString: 'postgres://postgres:postgrespw@localhost:55001/test'
});

module.exports = pool;