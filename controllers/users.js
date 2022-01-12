require('dotenv').config()

const express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    bcryt = require('bcrypt'),
    global = require('../shared/function')
    Users = require("../models/users")

router.get('/',global.authToken,(req,res)=>{

    if(req.body == null)
        req.body = {}

    Users.find(req.body)
        .then(result => {
            res.send(result);
        })
})

router.get('/:id',global.authToken,(req,res)=>{

    Users.findById(req.params.id)
        .then(result => {
            res.send(result)
        })
        .catch(result => {
            console.log(result)
            res.status(400).send('Id não encontrado')
        })
})

router.post('/',global.authToken,global.verifyAdmin,(req,res)=>{
    Users.insertMany(req.body)
        .then(result => {
            res.status(200).send(result)
        })
        .catch(result => {
            res.status(400).send(Object.values(result.errors).map(val => val.message))
        })
})

router.put('/',global.authToken,global.verifyAdmin,(req,res)=>{
    Users.validate(req.body)
        .then(result =>{
            if (result===true) {
                Users.insertMany(req.body)
                    .then(result => {
                        res.status(200).send(result)
                    })
                    .catch(result => {
                        res.status(400).send(Object.values(result.errors).map(val => val.message))
                    })
            }
            res.status(400).send(Object.values(req.body.errors).map(val => val.message))
        })
})


router.patch('/:id',global.authToken,global.verifyAdmin,(req,res)=>{
    Users.updateOne({"_id":req.params.id},req.body)
        .then(result =>{
            console.log(result)
            res.status(200).send('Update feito com sucesso')
        })
        .catch(result => {
            res.status(400).send(result)
        })
})

router.delete('/:id',global.authToken,global.verifyAdmin,(req,res)=>{
    Users.deleteOne({"_id":req.params.id})
        .then(()=>res.status(200).send('Delete feito com sucesso'))
        .catch(error=>{
            res.status(400).send(error)
        })
})

router.delete('/',global.authToken,global.verifyAdmin,(req,res)=>{

    if(req.body == null)
        req.body = {}

    if(Object.keys(req.body).length!==0) {
        Users.deleteMany(req.body)
            .then(result => {
                res.status(200).send(result)
            })
            .catch(result => {
                res.status(400).send(result)
            })
    }else{
        res.status(400).send('Body indefinido ou vazio')
    }

})

router.post('/login', (req,res)=>{
    let password = req.body.password,
        email = req.body.email

    if(!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).test(password)) {
        res.status(400).send('Password errada')
    } else {
        if (!(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/).test(email)) {
            res.status(400).send('Email errado')
        } else {
            Users.findOne({"email": email})
                .then(result => {
                    let user = result
                    bcryt.compare(password, result.password)
                        .then(result => {
                            if (result === true) {
                                userid=user._id
                                const accesstoken = jwt.sign({userid}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})//,

                                res.setHeader('authorization', accesstoken).send('Token gerado')
                            }
                        })
                        .catch(result => {
                            res.status(400).send(Object.values(result.errors).map(val => val.message))
                        })

                })
                .catch(result => {
                    res.status(400).send(Object.values(result.errors).map(val => val.message))
                })
        }
    }
})

router.post('/register', (req,res)=>{

    Users.validate(req.body)
        .then(result => {
            if (result===undefined||result===null   ) {

                   bcryt.hash(req.body.password, 10).then(result =>
                   {req.body.password = result
                       Users.insertMany(req.body)
                           .then(result => {
                               res.status(201).send(result)
                           })
                           .catch(() => {
                               res.status(400).send('Este email já existe')
                           })
                       })
            } else {
                console.log(result)
                res.status(400).send(result)
            }
            }
        )
        .catch(result =>{
            res.status(400).send(Object.values(result.errors).map(val => val.message))
        })

    })


module.exports = router