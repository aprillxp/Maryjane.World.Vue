const { Favorites } = require("../models");

async function authorization(req, res, next) {
  try {
    const { id } = req.params;

    const favorites = await Favorites.findByPk(id);

    if (!favorites) {
      throw { name: "Not found", id: id };
    }

      if (req.user.id !== favorites.userId) {
        throw { name: "Forbidden" };
      }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authorization