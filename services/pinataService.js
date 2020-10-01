const pinataService = () => {

    const pinatas = require('../data/data').pinatas;
    const omit = require('lodash.omit');
    const fs = require('fs');
    const surpriseFile = fs.createWriteStream('./surprises.txt');
    const isImageUrl = require('is-image-url');
    const request = require('request');

    for (keys in pinatas){
        pinatas[keys]['currentHits'] = 0;
    }
        
    
    const getAllPinatas = async (cb) => {
        var jsonData = [];
        for (var keys in pinatas){
            var data = omit(pinatas[keys], 'surprise')
            jsonData[keys] = data
        }
        cb(jsonData)
    };

    const getPinataById = async (id, cb, errorCb) => {
        var results = await pinatas.filter(x => x.id == id)
        if (results.length == 0){errorCb(404, 'This pinata does not exist')}
        else {cb(omit(results[0], 'surprise'))}
    };

    const createPinata = (pinata, cb) => {
        pinata_object ={"id" : pinatas.length + 1,
                        "name" : pinata.name,
                        "surprise" : pinata.surprise,
                        "maximumHits" : pinata.maximumHits,
                        "currentHits" : 0}
        pinatas.push(pinata_object)
        cb(pinata_object)
    };

    const hitPinata = async (id, cb, errorCb) => {
        var results = await pinatas.filter(x => x.id == id)

        if (results == []){errorCb(404, 'This pinata does not exist')}
        else if (results[0].currentHits > results[0].maximumHits) {errorCb(423, 'This pinata has already exploded')}
        else if (results[0].currentHits < results[0].maximumHits) {
            results[0].currentHits++;
            cb('', 204);
        }
        else if (results[0].currentHits == results[0].maximumHits) {
            results[0].currentHits++;
            if (!isImageUrl(results[0].surprise)){
                surpriseFile.write(results[0].surprise + '\n')
            }
            else {
                var extension = results[0].surprise.split(".").pop();
                request(results[0].surprise).pipe(fs.createWriteStream('./images/' + results[0].name + "." + extension)) 
            }
            cb(results[0].surprise, 200)
        }
    }

    return {
        getAllPinatas,
        getPinataById,
        createPinata,
        hitPinata
    };
};

module.exports = pinataService();