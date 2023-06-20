const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5360;

// 👇️ handle uncaught exceptions
process.on('uncaughtException', function (err) {
    console.log(err);
  });

// Parsing middleware
// Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false })); // Remove 
app.use(express.urlencoded({extended: true})); // New
// Parse application/json
// app.use(bodyParser.json()); // Remove
app.use(express.json()); // New

// MySQL Code goes here
const pool  = mysql.createPool({
    connectionLimit : 100,
    host            : '8.218.162.72',
    user            : 'admin',
    password        : 'ited2023@MV',
    database        : 'nodejs_beers',
    port: '5360'
})

// Get all beers
app.get('', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from beers', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from beer table are: \n', rows)
        })
    })
})


// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listening on port ${port}`))

