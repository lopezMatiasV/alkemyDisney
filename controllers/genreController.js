const db = require("../database/models");
const getUrl = (req) =>
  req.protocol + "://" + req.get("host") + req.originalUrl;

module.exports = {
  all: (req, res) => {
    db.Genero.findAll({
      include: [{ association: "films", include: ["personajes"] }],
    })
      .then((result) => {
        res.status(200).json({
          meta: {
            endPoint: getUrl(req),
            status: 200,
            total: result.length,
          },
          data: result,
        });
      })
      .catch((error) => res.status(400).send(error));
  },
  one: (req, res) => {
    db.Genero.findByPk(req.params.id, {
      include: [{ association: "films", include: ["personajes"] }],
    })
      .then((result) => {
        res.status(200).json({
          meta: {
            endPoint: getUrl(req),
            status: 200,
            total: result.length,
          },
          data: result,
        });
      })
      .catch((error) => res.status(400).send(error));
  },
};
