
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const Admin = require("./modals/admin.js");
const User = require("./modals/user.js");
const playlistRoutes = require('./routes/playlistRoutes');

mongoose.connect('mongodb://localhost:27017/onemusic');

const app = express();
app.use(express.json());
let PORT = 4000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/', playlistRoutes);
//user login
app.post('/login', (req, res) => {
    console.log(req.body)
    console.log(req.query)
    login(req, res)
})

//admin login
app.post('/loginadmin', (req, res) => {
    console.log(req.body)
    console.log(req.query)
    loginadmin(req, res)
})

//user sign
app.post('/signup', async (req, res) => {
    console.log(req.body)
    if (await User.findOne({ "email": req.body.email })) return res.send({ "status": 404, "data": "User already exist" })
    console.log(req.body)
    res.send({ "status": 200, "data": "User created Sus" })
    User.create(req.body);
})

//Admin sign
app.post('/signupadmin', (req, res) => {
    console.log(req.body)
    console.log(req.body)
    res.send({ "status": 200, "data": "User created Sus" })
    Admin.create(req.body);
})

//user
async function login(req, res) {
    var data = await User.findOne(req.body);
    data = data || 0;
    if (data != 0) {
        data.password = '';
        res.send({ "status": 200, "data": "valid user", "user": data })
    }
    else {
        res.send({ "status": 404, "data": "invalid user" })
    }
}

async function loginadmin(req, res) {
    var data = await Admin.findOne(req.body);
    data = data || 0;
    if (data != 0) {
        data.password = '';
        res.send({ "status": 200, "data": "valid user", "user": data })
    }
    else (
        res.send({ "status": 404, "data": "invalid user" })
    )
}

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}/`));


