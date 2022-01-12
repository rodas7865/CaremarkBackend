const mongoose = require("mongoose"),
    Schema = mongoose.Schema

const escalaSchema = new Schema(
    {
        confirmado : {
            type:Boolean,
            required:[true, 'É necessario confirmação para o documento']
        },
        user_id : {
            type:String,
            required:[true, 'É necessario id do utilizador']
        },
        hora : {
            type:[Number],
            validate:[horaValid,'Hora não é valida (não introduzio hora, numeros não são validos ou não seguio a ordem do menor para maior)']
        },
        date:{
            type: [Number],
            validate:[dateValid,'Date não é valida (formato : dd/mm/yyyy, não pode inserir mais / menos que 3 valores)']
        },
        notas : {
            type:String,
            required:[true, 'É necessario notas, se não for pretendido escrever nada insira ("") ']
        }
    },{
        timestamps : true,
        collection : 'Escalas'
    }
)

const  modelEscala = mongoose.model('Escala',escalaSchema);

module.exports = modelEscala

function dateValid(val){
    let valid = false
    if(val.length===3){
     if(val[0]>31){
         return valid //false
     }
     if(val[1]>12){
         return valid //false
     }
     if(val[2]<1990){
         return valid //false
     }
     valid = true
    }
    return valid
}

function  horaValid(val){
    let valid = false

        if(val.length===2){

            if(val[0]>24||val[0]===0||val[1]>24||val[1]===0){
                return valid
            }

            if(val[1]<val[0]){
                return valid
            }
            valid = true
        }

    return valid
}