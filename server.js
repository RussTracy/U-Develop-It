// Require libraries.
const express = require('express')
const mysql = require('mysql')

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysqlOcjade#1014',
    database: 'election_db'
})

connection.connect(function (err) {
    if (err) throw err
    console.log('You are now connected with mysql database...')
})

//rest api to get all candidates
app.get('/candidates', function (req, res) {
    connection.query(`SELECT candidates.*, parties.party_name
    AS "Party Name"
    FROM candidates
    LEFT JOIN parties
    ON candidates.party_id = parties.id`, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
    // connection.query('SELECT * FROM candidates', function (error, results, fields) {
    //     if (error) throw error;
    //     res.end(JSON.stringify(results));
    // });
});

//rest api to get a single candidate data
app.get('/candidates/:id', function (req, res) {
    connection.query('SELECT candidates.*, parties.party_name AS "Party Name" FROM candidates LEFT JOIN parties ON candidates.party_id = parties.id WHERE candidates.id=?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });

    // connection.query('SELECT * FROM candidates WHERE id=?', [req.params.id], function (error, results, fields) {
    //     if (error) throw error;
    //     res.end(JSON.stringify(results));
    // });
});

//rest api to create a new candidate record into mysql database
app.post('/candidates', function (req, res) {
    var params = req.body;
    console.log(params);
    connection.query('INSERT INTO candidates SET ?', params, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

//rest api to update record into mysql database
app.put('/candidates', function (req, res) {
    console.log(req.body);
    if (!req.body.id) {
        res.end('No id selected, update unsuccessful!');
        return false;
    };
    connection.query('UPDATE `candidates` SET `first_name`=?,`last_name`=?,`industry_connected`=? WHERE id=?', [req.body.first_name, req.body.last_name, req.body.industry_connected, req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

//rest api to delete record from mysql database
app.delete('/candidates', function (req, res) {
    console.log(req.body);
    if (!req.body.id) {
        res.end('No id selected, delete unsuccessful!');
        return false;
    };
    connection.query('DELETE FROM `candidates` WHERE `id`=?', [req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.end('Record has been deleted!');
    });
});

// connection.end()


app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

// Default response for any other request(Not Found) Catch all
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});