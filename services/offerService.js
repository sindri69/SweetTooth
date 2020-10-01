const offerService = () => {

    const offers = require('../data/data').offers;
    const candyService = require('./candyService');
    const candies = candyService.getAllCandies();
    var counter = 0; //Checks if getAllOffers has been called before


    const getAllOffers = async (cb) => {
        if (counter == 0){
            var jsonData = [];
            for (var keys in offers){
                jsonData[keys] = offers[keys]
            }
            for (var keys in jsonData){
                candy_list = []
                for (var i = 0; i <= jsonData[keys].candies.length; i++){
                    var results = await candies.filter(x => x.id == jsonData[keys].candies[i])
                    candy_list[i] = results[0]
                } 
                for (var elements in jsonData[keys].candies){
                    jsonData[keys].candies[elements] = candy_list[elements]
                }
                
            }
            counter ++
            cb(jsonData)
        }
        else {
            cb(offers)
        }};

    return {
        getAllOffers,
    };
};

module.exports = offerService();