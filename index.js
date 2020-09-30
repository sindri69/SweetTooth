const candieService = require('./services.candieService');
const offerService = require('./services.offerService');
const pinataService = require('./services.pinataService');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())