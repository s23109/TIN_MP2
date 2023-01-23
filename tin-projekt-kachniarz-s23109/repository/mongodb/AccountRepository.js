const mongo = require('../../config/mongodb/mongoInit');
const client = mongo.client;
const account = require('../../model/mongodb/Account');
const authUtil = require('../../utils/authUtil');
const {hashPassword} = require("../../utils/authUtil");
const {parse} = require("nodemon/lib/cli");
const {log} = require("debug");

const db = client.collection('LoginData');

exports.createAccountUnsafe = async (acc) => {
    acc.accPerm = "self";
    acc.password = authUtil.hashPassword(acc.password);
    await db.insertOne(acc);
}

exports.clientHasAccount = async (id) => {
    id = parseInt(id);
    let qbe = {kliID: id};

    const query = await db.findOne(qbe);

    if (query){
        return true;
    }

    return false;
}

exports.loginUsedError = async (login) => {

    let qbe = {login: login};

    const query = await db.findOne(qbe);

    if (query){
        throw new Error({path :"login", message:"err.loginUsed"});
    }
    return null;
}

exports.checkIfLoginUsedByOther = async (login,kliID) => {
    //wywali błąd jak login używany przez inny kliID
    let qbe = {login: login};

    const query = await db.findOne(qbe);

    kliID = parseInt(kliID);

    if (query.kliID != kliID) {
        throw new Error({path :"login", message:"err.loginUsed"});
    }
    return null;
}

exports.createAccount = async (acc) => {
    acc.kliID = parseInt(acc.kliID);
    if (await this.clientHasAccount(acc.kliID)){
        throw new Error("Client has Account");
    }
    else {
        this.createAccountUnsafe(acc);
    }
}

exports.deleteAccount = async (kliID) => {
    kliID = parseInt(kliID);
    let qbe = {kliID: kliID};

    if (await this.clientHasAccount(kliID)){
        await db.deleteOne(qbe);
    }else {
        console.log("MongoDB: Account- Tried to delete non existing kliID" + kliid);
    }

}

exports.updateAccount = async (acc) => {
    //nie zmienia permisji acc
    acc.kliID = parseInt(acc.kliID);

    //przypadek gdy pass jest pusty :
    if (acc.password === "") {
        if (await this.clientHasAccount(parseInt(acc.kliID))){
           await db.updateOne({kliID: parseInt(acc.kliID)},
                {$set:{login:acc.login}})
        } else {
            console.log("MongoDB: Account- Tried to Update non existing kliID" + id);
        }
    }
    else {
        // jak zmienia hasło
    if (await this.clientHasAccount(parseInt(acc.kliID))){
        // tu zakładam ze nie zmieniamy przypisania danych bo to nie ma sensu???
      await  db.updateOne({kliID: parseInt(acc.kliID)},
            {$set:{login:acc.login,password:authUtil.hashPassword(acc.password)}})
    } else {
        console.log("MongoDB: Account- Tried to Update non existing kliID" + id);
    }

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


    let query = await db.findOne({kliID:parseInt(kliID)},{accPerm:1});
    console.log(query);
    console.log(JSON.stringify(query));

    return query.accPerm;
}

exports.getAllAccounts = async () => {
    //return all except _id and pass (obviously...)
    let accs = await db.find({},{login:1,password:0,kliID:1,_id:0,accPerm:1});
    return accs.toArray();
}