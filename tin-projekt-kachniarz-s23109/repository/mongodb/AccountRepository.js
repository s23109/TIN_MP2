const mongo = require('../../config/mongodb/mongoInit')
const client = mongo.client;
const account = require('../../model/mongodb/Account')

const db = client.collection('LoginData');

exports.createAccount = (acc) => {
    db.insertOne(acc);
}

exports.deleteAccount = (id) => {

}
