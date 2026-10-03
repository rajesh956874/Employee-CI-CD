
console.log("1. Starting test...");

const { poolPromise } = require('./config/db');

console.log("2. db.js loaded");

async function testDatabase() {
    try {
        console.log("3. Connecting to SQL Server...");

        const pool = await poolPromise;

        console.log("4. Connected!");

        const result = await pool.request().query(
            'SELECT GETDATE() AS CurrentDate'
        );

        console.log("5. Query result:");
        console.log(result.recordset);

    } catch (error) {
        console.log("6. ERROR:");
        console.error(error);
    }
}

testDatabase(); 