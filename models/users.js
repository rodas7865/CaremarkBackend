const mongoose = require("mongoose"),
    Schema = mongoose.Schema

const escalaUsers = new Schema({
    nome: {
        type: String,
        required: [true, 'É necessario um nome']
    },
    sobrenome: {
        type: String,
        required: [true, 'É necessario um sobrenome']
    },
    area:{
        type: String,
    required: [true, 'É necessario uma area de especialização']
    },
    password:{
        type:String,
        validate:[passwordValid,'Password precisa de ser pelo menos 8 characters, uma letra maiuscula, uma letra minuscula e um número']
    },
    admin:{
        type:Boolean,
        required:[true,'É necessario admin (true/false)']
    },
    email:{
        type:String,
        validator:[emailValid,'Email é invalido']
    }

},{
    timestamps : true,
    collection : 'Users'
})

const  modelUsers = mongoose.model('Users',escalaUsers);

module.exports = modelUsers

function passwordValid(val){
    return (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).test(val)
}

function emailValid(val){
    return (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/).test(val)
}