const express = require("express"),
    app = express(),
    cors = require('cors'),
    port = process.env.PORT || 8080,
    projName = "Caremark",
    url ="mongodb://admin:admin@tdwficha-shard-00-00.swz9o.mongodb.net:27017,tdwficha-shard-00-01.swz9o.mongodb.net:27017,tdwficha-shard-00-02.swz9o.mongodb.net:27017/Caremark?ssl=true&replicaSet=atlas-42jsfi-shard-0&authSource=admin&retryWrites=true&w=majority",
    dbName = "Caremark",
    mongoose = require("mongoose"),
    connect =mongoose.connect(url,{dbName:dbName, useNewUrlParser: true, useUnifiedTopology: true})


app.use(express.json());
app.use(cors({
    origin:"*",
    allowedHeaders:"*",
    exposedHeaders:"*"
}))
app.use(function (req,res,next){
    let date = new Date(),
        dataEtempo = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" em "+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    console.log("Pedido: " + req.method + " - " + dataEtempo)
    next();
});

connect.then((db) =>{

    let escala = require("./controllers/escala"),
        users = require('./controllers/users')
        app.use('/escala',escala)
        app.use('/users',users)

    console.log("Conectado ao Servidor")
    app.listen(port, () => console.log(projName +` - by Rodrigo Cartaxo at port: ${port}!`))
})