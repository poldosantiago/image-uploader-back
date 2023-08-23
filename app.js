const os = require('os');

const express = require('express');
const dotenv = require('dotenv').config();
const db = require('./db.js');
const routes = require('./routes/routes');

const app = express();
routes(app);

const porta = process.env.PORT || 3000;

app.listen(porta, () => console.log(`- servidor ouvindo pela porta ${porta}\n- http://localhost:${porta}`));

// console.log(process.env);
