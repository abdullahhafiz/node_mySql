const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const { getHomePage } = require('./public/routes/index');
const { addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage } = require('./public/routes/player');
const path = require('path');
const port = 5000;
const db = mysql.createConnection({
    host: 'localhost',
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
//app.set('views', __dirname + './views'); // set express to look in this folder to render our view
app.set('views', './public/views');
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload());
// routes for the app

app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
