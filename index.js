const express = require('express');
require('dotenv').config();

const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const personRoutes = require('./routes/user');
const menuRoutes = require('./routes/menu.route');
const passport = require('./auth');
app.use(bodyParser.json());
app.use(passport.initialize());
const {jwtAuthMiddleware, generateToken} = require('./jwt');

app.get('/',function (req,res) {
    res.send("welcome to our hotels");
})

app.use('/person' ,  personRoutes);
app.use('/menu', menuRoutes);
app.listen(3000, () => { console.log("Listening on port 3000") });
