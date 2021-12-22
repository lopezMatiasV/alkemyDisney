const db =  require('../database/models')
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken')
const getUrl = (req) =>
  req.protocol + "://" + req.get("host") + req.originalUrl;

module.exports = {
    register: (req, res) => {
        const {
          nombre,
          email,
          password,
        } = req.body;
        db.Usuario.create({
          nombre,
          email,
          password: bcrypt.hashSync(password, 10),
        })
        .then(result => {
          res.status(201).json({
            meta: {
              endPoint: getUrl(req),
              msg: "Usuario creado",
            },
            data: result,
          });
        }).catch(error => res.status(400).send(error));
      },
      login: (req, res) => {
        db.Usuario.findOne({
          where: { email: req.body.email }
      })
      .then(user => {
        if(bcrypt.compareSync(req.body.password, user.password)){
          req.session = { 
            id: user.id,
            nombre: user.nombre,
            email: user.email,
        }
        jwt.sign({user}, 'secretkey'/* , {expiresIn : '120s'} */, (err, token)=>{
          res.status(201).json({
            meta: {
              endPoint: getUrl(req),
              msg: `Sesion levantada con el usuario ${user.nombre}`,
              token, 
            },
            data: user,
          })
        })
        }else{
          return res.status(404).send({message : "Credenciales invalidas"})
        }
      })
      .catch(error => res.status(400).send(error));
      },
}