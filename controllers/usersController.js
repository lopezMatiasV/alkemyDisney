const db =  require('../database/models')
let bcrypt = require('bcrypt');
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
          req.session.user = { 
              id: user.id,
              nombre: user.nombre,
              email: user.email,
          }
          res.status(201).json({
            meta: {
              endPoint: getUrl(req),
              msg: `Sesion levantada con el usuario ${user.nombre}`
            },
            data: user,
          })
      })
      .catch(error => res.status(400).send(error));
      },
}