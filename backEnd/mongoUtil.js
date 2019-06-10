const mongoClient = require('mongodb').MongoClient;
const mongoDbUrl = 'mongodb://127.0.0.1:27017';


let mongodb;

function connect(callback){
    mongoClient.connect(mongoDbUrl, (err, client) => {
        mongodb = client.db('shopsite');
        callback();
    });
}
function get(){
    return mongodb;
}

function close(){
    mongodb.close();
}

module.exports = {
    connect,
    get,
    close
};
