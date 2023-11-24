const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 3000;

app.listen(port, (req, res) =>{
    console.log(`Server is listening on port ${port}`);
});

app.get('/', (req, res) => {
    res.render('home.ejs');
})