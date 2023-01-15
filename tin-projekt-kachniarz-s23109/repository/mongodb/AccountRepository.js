const mongo = require('../../config/mongodb/mongoInit');
const client = mongo.client;
const account = require('../../model/mongodb/Account');
const authUtil = require('../../utils/authUtil');
const {hashPassword} = require("../../utils/authUtil");

const db = client.collection('LoginData');

exports.createAccountUnsafe = async (acc) => {
    acc.password = authUtil.hashPassword(acc.password);
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

exports.createAccount = async (acc) => {
    if (await this.accountExists(acc.kliID)){
        throw new Error("Login Already Used");
    }
    else {
        this.createAccountUnsafe(acc);
    }
}

exports.deleteAccount = async (id) => {
    let qbe = {kliID: id};

    if (await this.accountExists(id)){
        await db.deleteOne(qbe);
    }else {
        console.log("MongoDB: Account- Tried to delete non existing kliID" + id);
    }

}

exports.updateAccount = async (acc) => {
    if (await this.accountExists(acc.id)){
        // tu zakładam ze nie zmieniamy przypisania danych bo to nie ma sensu???
        db.updateOne({kliID: acc.id},
            {$set:{login:acc.login,password:acc.password}})
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
            kliID:query.kliID
        };
    }
    return null;
}

exports.getAmount = async () => {
    return await db.countDocuments();
}