const jwt = require('jsonwebtoken'),
    Users = require("../models/users")

module.exports = {

    authToken : function (req, res, next)
    {
        const authHeader = req.headers['authorization'],
            token = authHeader && authHeader.split(' ')[1]
        if (token == null) {
            return res.status(403).send('Acesso Negado')
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).send('Acesso Negado')
            req.user = user
            next()
        })
    },

    verifyAdmin : function (req, res, next) {
        const authHeader = req.headers['authorization'],
            token = authHeader && authHeader.split(' ')[1],
            userId=atob(token.split('.')[1])

        Users.findById(userId)
            .then(result=>{
                (result.admin === true) ? (next()) : (res.status(418).send('Utilizador não é admin'))
            })
    }
}
