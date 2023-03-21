const express = require('express');
const {engine} = require('express-handlebars');
const bodyParser = require('body-parser');

const telephoneRoute = require('./Route/telephoneRoute');

const app = express();

app.engine('handlebars', engine( {
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
} ));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/views'));

app.use('/', telephoneRoute);

app.listen(3000, () =>
{
    console.log(`Listening to http://localhost:3000/`);
});
