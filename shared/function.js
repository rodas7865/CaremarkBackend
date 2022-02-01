const jwt = require('jsonwebtoken')

module.exports = {

    authToken : function (req, res, next)
    {
        const authHeader = req.headers['authorization'],
            token = authHeader && authHeader.split(' ')[1]
        if (token == null) {
            return res.status(401).send('Acesso Negado')
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(401).send('Acesso Negado')
            req.user = user
            next()
        })
    },

    verifyAdmin : function (req, res, next) {
        (req.user.user.admin === true) ? (next()) : (res.status(401).send('Utilizador não é admin'))
    }
}
