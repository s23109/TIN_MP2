const mongo = require('../../config/mongodb/mongoInit')
const client = mongo.client;
const account = require('../../model/mongodb/Account')

const db = client.collection('LoginData');

exports.createAccount = async (acc) => {
    await db.insertOne(acc);
}

exports.accountExists = async (id) => {
    let qbe = {kliID: id};

    const query = await db.findOne(qbe);

    if (query){
        return true;
    }

    return false;
}

exports.deleteAccount = async (id) => {
    let qbe = {kliID: id};

    if (await this.accountExists(id)){
        await db.deleteOne(qbe);
    }else {
        console.log("MongoDB: Account- Tried to delete non existing kliID" + id);
    }
    
}

