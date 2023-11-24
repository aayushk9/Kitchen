require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const app = express();
const bodyparser = require('body-parser');
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const { connect } = require('http2');
const URI = process.env.MONGODB_URI;


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json()); 
app.set('view engine', 'ejs');  
app.set('views', path.join(__dirname, 'views'));

// connecting to the database 
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then (() => {
   console.log('Connected to MongoDB');
}).catch((err) => {  
   console.log(`Error connecting to Database ${err}`);
});

// creating user schema using mongoose
const userSchema = new mongoose.Schema({
    name: String,
    email: String,   
    mobile: Number,
    city: String
  });
  
const User = mongoose.model('User', userSchema);


app.listen(port, (req, res) =>{
    console.log(`Server is listening on port ${port}`);
});

app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.post('/', async (req, res) => {
    const {name, email, mobile, city } = req.body;
    console.log(req.body);
    try{
        const newUser = new User({name, email, mobile, city}); 
        // adding new user to database
        await newUser.save(); 
        res.json({success: true, message: 'Successfully submitted'});
    }catch(err){
        console.log(`Error saving data ${err}`);
        res.status(500).send('Error saving data');
    }
});

