
const express = require('express');
const app = express();
const db = require('./db/connect');
const userRoutes = require ('./routes/user.routes');
const cors = require ('cors');
const bodyParser = require('body-parser');

//connecting to database
db();
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({ extended : true}))
app.use('/api', userRoutes);

app.get('/hello', (req, res)=>{
    res.send ('Hello world')
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})