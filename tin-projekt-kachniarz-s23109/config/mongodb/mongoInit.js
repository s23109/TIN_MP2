const {MongoClient} = require('mongodb');
const serverUrl = `mongodb://localhost:27017`
const cli = new MongoClient(serverUrl);
// schemat na db
const client =  cli.db('AccountInfo');

var fun = {};

fun.client = client;

const init = async () => {

    await cli.connect();
    console.log("Connected to MongoDB instance on " + serverUrl);

    const collections = await  client.listCollections().toArray();
    //console.log(collections)
    const collectionsNames = collections.map(c => c.name);

    if (collectionsNames.includes("LoginData")){
        console.log("Collection found");

        // console.log(JSON.stringify(test))


        //const acc = {name:'lol',age:13};
        //client.db('AccountInfo').collection('TEST').insertOne(acc);

    }else {
        console.log("Collection not found, creating");
        cli.db('AccountInfo').createCollection('LoginData');
    }


}

fun.init = init;
module.exports = fun;