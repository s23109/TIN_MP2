const {MongoClient} = require('mongodb');
const serverUrl = `mongodb://localhost:27017`

module.exports = async () => {
    const client = new MongoClient(serverUrl);
    await client.connect();
    console.log("Connected to MongoDB instance on " + serverUrl);

    const collections = await  client.db().listCollections().toArray();
    //console.log(collections)
    const collectionsNames = collections.map(c => c.name);
    if (collectionsNames.includes("Accounts")){
        console.log("IS");
    }else {
        console.log("NON");
        client.db().createCollection('Accounts');
    }


}


