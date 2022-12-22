const {MongoClient} = require('mongodb');
const serverUrl = `mongodb://localhost:27017`

module.exports = async () => {
    const client = new MongoClient(serverUrl);
    await client.connect();
    console.log("Connected to MongoDB instance on " + serverUrl);
}


