const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'kota-podomoro-tenjo';


const connectMongo = async () => {
    await client.connect()
    console.log('Connected to MongoDB');
    return client.db(dbName);
}

module.exports = { client, connectMongo };