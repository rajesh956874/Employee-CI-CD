const sql = require('mssql/msnodesqlv8');

const config = {
    server: 'DESKTOP-77VD1TH',
    database: 'EmployeeDB',
    driver: 'ODBC Driver 18 for SQL Server',
    options: {
        trustedConnection: true,
        trustServerCertificate: true
    }
};

const poolPromise = sql.connect(config);

module.exports = {
    sql,
    poolPromise
};