const express = require('express');
const cors = require('cors');

const { poolPromise } = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Employee API is running');
});

app.post('/api/employees', async (req, res) => {
    try {
        const { EmployeeName, Email, Phone } = req.body;

        const pool = await poolPromise;

        await pool.request()
            .input('EmployeeName', EmployeeName)
            .input('Email', Email)
            .input('Phone', Phone)
            .query(`
                INSERT INTO dbo.Employee
                (EmployeeName, Email, Phone)
                VALUES
                (@EmployeeName, @Email, @Phone)
            `);

        res.status(201).json({
            message: 'Employee added successfully'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to add employee'
        });
    }
});

app.get('/api/employees', async (req, res) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request().query(`
            SELECT
                EmployeeId,
                EmployeeName,
                Email,
                Phone,
                CreatedDate
            FROM dbo.Employee
            ORDER BY EmployeeId DESC
        `);

        res.json(result.recordset);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to get employees'
        });
    }
});
app.listen(3000, () => {
    console.log('Server running on port 3000');
});