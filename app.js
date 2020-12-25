const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const path = require('path');
const port = 5000;
const db = mysql.createConnection({
    host: 'host',
    user: 'root',
    password: '03060812120',
    database: 'test'
});
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to Database');
});
global.db = db;
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload());
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
