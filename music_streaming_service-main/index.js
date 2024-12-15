
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser')
const Admin = require("./modals/admin.js");
const User = require("./modals/user.js");
const playlistRoutes = require('./routes/playlistRoutes');
// Create a model for the contact form
// const Contact = require('./models/contact.js');  // Make sure the path is correct
const Contact = require('./modals/contact.js');  // Make sure the path is correct


mongoose.connect('mongodb://localhost:27017/onemusic');

const app = express();
app.use(express.json());
let PORT = 4000;
app.use(bodyParser.urlencoded({ extended: true }));

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
app.post('/admin', (req, res) => {
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
    console.log(data,"admin_data");
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

// Route to handle POST requests to store form data
app.post('/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log(req.body,"kunjj")
    // Create a new Contact document
    // const name="heyyy";
    // const email="anj@gmail.com";
    // const subject='hihihi';
    // const message="messageszz";
    const newContact = new Contact({ name, email, subject, message });
    
  
    try {
      // Save the document to the database
      await newContact.save();
     
      res.redirect('/?success=true');
    } catch (err) {
      console.error('Error saving data:', err);
      res.status(500).send('Error saving data');
    }
  });
  

