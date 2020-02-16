const express = require("express");
const routes = require('../routes/routes')
const mongoose = require('mongoose');
const cors = require('cors')
const { atlas_uri } = require('./private.json')

const app = express();

mongoose.connect(atlas_uri,
{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

app.use(cors())

app.use(express.json());


routes(app)


module.exports = app;