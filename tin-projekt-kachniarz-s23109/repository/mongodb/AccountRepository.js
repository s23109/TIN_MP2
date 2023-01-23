const mongo = require('../../config/mongodb/mongoInit');
const client = mongo.client;
const account = require('../../model/mongodb/Account');
const authUtil = require('../../utils/authUtil');
const {hashPassword} = require("../../utils/authUtil");
const {parse} = require("nodemon/lib/cli");

const db = client.collection('LoginData');

exports.createAccountUnsafe = async (acc) => {
    acc.password = authUtil.hashPassword(acc.password);
    await db.insertOne(acc);
}

exports.accountExists = async (id) => {
    id = parseInt(id);
    let qbe = {kliID: id};

    const query = await db.findOne(qbe);

    if (query){
        return true;
    }

    return false;
}

exports.createAccount = async (acc) => {
    acc.kliID = parseInt(acc.kliID);
    if (await this.accountExists(acc.kliID)){
        throw new Error("Login Already Used");
    }
    else {
        this.createAccountUnsafe(acc);
    }
}

exports.deleteAccount = async (kliid) => {
    kliid = parseInt(kliid);
    let qbe = {kliID: kliid};

    if (await this.accountExists(kliid)){
        await db.deleteOne(qbe);
    }else {
        console.log("MongoDB: Account- Tried to delete non existing kliID" + kliid);
    }

}

exports.updateAccount = async (acc) => {
    acc.id = parseInt(acc.id);

    if (await this.accountExists(parseInt(acc.id))){
        // tu zakładam ze nie zmieniamy przypisania danych bo to nie ma sensu???
        db.updateOne({kliID: parseInt(acc.id)},
            {$set:{login:acc.login,password:authUtil.hashPassword(acc.password)}})
    }else {
        console.log("MongoDB: Account- Tried to Update non existing kliID" + id);
    }
}

exports.getByLogin = async (login) => {
    let qbe = {login:login};
    const query= await db.findOne(qbe);

    if (query){
        return {
            login: query.login,
            password: query.password,
            kliID:parseInt(query.kliID)
        };
    }
    return null;
}

exports.getByKliID = async (kliID) => {
    // Does not return password hash

    // console.log("KliID:" + kliID);
    kliID = parseInt(kliID);

    const qbe = {kliID:kliID};

    const query= await db.findOne(qbe, {_id:0,login:1,password:0,kliID:1,accPerm:0});

    console.log("Object from MDB:" + JSON.stringify(query));

    if (query){

        return query;
    }
    return null;
}

exports.getAmount = async () => {
    return await db.countDocuments();
}

exports.getPermission = async(kliID) => {
    kliID = parseInt(kliID);

    let query = await db.findOne({kliID:kliID});

    return query.accPerm;
}