const centers = require('../src/services/centers');

module.exports = {
  list: centers.list,
  // TODO Esto no se deberia de tener acceso, lo pongo para que el template pueda crear centros
  add: centers.add,
  existName: centers.existName,
};
