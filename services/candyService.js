const candyService = () => {

    const candies = require('../data/data').candies;
        
    const getAllCandies = () => {
        return candies
    };

    const getCandiesForOffers = () => {
        return candies
    }

    const getCandyById = async (id, cb, errorCb) => {
        var results = await candies.filter(x => x.id == id)
        if (results.length == 0){errorCb(404, 'This candy does not exist')}
        else {cb(results[0])}
    };

    const createCandy = (candy, cb) => {
        candy_object = {"id": candies.length + 1,
                        "name" : candy.name,
                        "description" : candy.description}
        candies.push(candy_object)
        cb(candy_object)
    };

    return {
        getAllCandies,
        getCandyById,
        createCandy,
        getCandiesForOffers
    };
};

module.exports = candyService();