const candyService = require('./services/candyService');
const pinataService = require('./services/pinataService');
const offerService = require('./services/offerService');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())

//Get all candies
app.get('/api/candies', async function(req,res) {
  var candies = await candyService.getAllCandies()
    return res.status(200).json(candies)
  });


//Get a candy by id
app.get('/api/candies/:candyid', async function(req,res){
  const candyid = req.params.candyid;
  await candyService.getCandyById(candyid, function(candy) {
      return res.status(200).json(candy);
  }, function(status, error_message) {
      return res.status(status).json(error_message)
  });
});

//Create a single candy
app.post('/api/candies', function(req,res){
  candyService.createCandy(req.body, function(candy){
      return res.status(201).json(candy);
  });
});

//get all offers
app.get('/api/offers', async function(req,res) {
  await offerService.getAllOffers(function(offers) {
      return res.status(200).json(offers);
  }, function(err, status, error_message) {
      return res.status(status).json(error_message)
  });
});

//get all pinatas
app.get('/api/pinatas', async function(req,res) {
  await pinataService.getAllPinatas(function(pinatas) {
      return res.status(200).json(pinatas);
  }, function(status, error_message) {
      return res.status(status).json(error_message)
  });
});

//Get a pinata by id
app.get('/api/pinatas/:pinataid', async function(req,res){
  const pinataid = req.params.pinataid;
  await pinataService.getPinataById(pinataid, function(pinata) {
      return res.status(200).json(pinata);
  }, function(status, error_message) {
      return res.status(status).json(error_message)
  });
});

//Create a pinata
app.post('/api/pinatas', function(req,res){
  pinataService.createPinata(req.body, function(pinata){
      return res.status(201).json(pinata);
  }, function(status, error_message) {
      return res.status(parseInt(status)).json(error_message);
  });
});

app.put('/api/pinatas/:id/hit', function(req, res) {
  const pinataid = req.params.id;
  pinataService.hitPinata(pinataid, function(pinata, status){
    return res.status(status).send(pinata);
  }, function(status, error_message) {
      return res.status(status).json(error_message)
  });
  })

app.listen(3000, function(){
  console.log('server is listening on port 3000')
})