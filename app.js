const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./backend/api');
const path = require('path');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
//Apis
app.use('/api', apiRouter);

// Rutas
app.get('/', (req, res) => {
    res.render('dashboard');
});

app.get('/missions', (req, res) => {
    res.render('missions');
});

app.get('/3dModel', (req, res) => {
    res.render('model');
});

module.exports = app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

