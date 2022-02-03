const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect(process.env.URI).then((client) => {
        console.log('Db connected😄');
        callback(client)
    }).catch((err) => console.log(err))


}



module.exports = mongoConnect;




















