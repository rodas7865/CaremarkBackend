const express = require('express'),
    router = express.Router(),
    global = require('../shared/function')
    Escala = require("../models/escala")

router.get('/',global.authToken,(req,res)=>{

    if(req.body == null)
        req.body = {}

    Escala.find(req.body)
    .then(result => {
        res.send(result);
    })
})

router.get('/:id',global.authToken,(req,res)=>{

    let filter={_id :req.params.id}
    Escala.find(filter)
        .then(result => {
                res.status(200).send(result)
        })
        .catch(result => {

        })
})

router.post('/',global.authToken,global.verifyAdmin,(req,res)=>{
    Escala.create(req.body)
        .then(result => {
            res.status(203).send(result)
        })
        .catch(result => {
            res.status(406).send(Object.values(result.errors).map(val => val.message))
        })
})

router.put('/',global.authToken,global.verifyAdmin,(req,res)=>{
    Escala.validate(req.body)
    .then(result =>{
        if (result===true) {
            Escala.insertMany(req.body)
                .then(result => {
                    res.status(203).send(result)
                })
                .catch(result => {
                    res.status(406).send(Object.values(result.errors).map(val => val.message))
                })
        }
        res.status(406).send(Object.values(req.body.errors).map(val => val.message))
    })
})


router.patch('/:id',global.authToken,global.verifyAdmin,(req,res)=>{
    Escala.updateOne({"_id":req.params.id},req.body)
        .then(result =>{
            console.log(result)
            res.status(203).send('Update feito com sucesso')
        })
        .catch(result => {
            res.status(418).send(result)
        })
})

router.patch('/:id/confirm',global.authToken,(req,res)=>{


        if (req.body.confirmado===undefined||req.body.confirmado===null||typeof req.body.confirmado!=="boolean"){
            res.status(406).send(error)
        }else{
            Escala.updateOne({"_id":req.params.id},req.body)
                .then(result =>{
                    console.log(result)
                    res.status(203).send('Update feito com sucesso')
                })
                .catch(result => {
                    res.status(418).send(result)
                })
        }

})

router.delete('/:id',global.authToken,global.verifyAdmin,(req,res)=>{
    Escala.deleteOne({"_id":req.params.id})
        .then(()=>res.status(200).send('Delete feito com sucesso'))
        .catch(error=>{
            res.status(418).send(error)
        })
})

router.delete('/',global.authToken,global.verifyAdmin,(req,res)=>{

    if(req.body == null)
        req.body = {}

    if(Object.keys(req.body).length!==0) {
        Escala.deleteMany(req.body)
            .then(result => {
                res.status(200).send(result)
            })
            .catch(result => {
                res.status(418).send(result)
            })
    }else{
        res.status(406).send('Body indefinido ou vazio')
    }

})
module.exports = router

