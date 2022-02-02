const mongoose = require("mongoose"),
    Schema = mongoose.Schema

const escalaSchema = new Schema(
    {
        confirmado : {
            type:Boolean,
            required:[true, 'É necessario confirmação para o documento']
        },
        user_id : {
            type:[String],
            required:[true, 'É necessario id do utilizador']
        },
        inicio : {
            type:Date,
            required:[true, 'É necessario hora de inicio']
        },
        fim:{
            type: Date,
            required:[true, 'É necessario hora de fim']
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
